const Usuario = require('../../models/usuarios'); 
const bcrypt = require('bcrypt');

exports.criarUsuario = async (req, res) => {
    let { nome, email, senha, permissoes } = req.body;
    console.log(req.body);
    try {
        if (!nome || !email || !senha || !permissoes) {
            return res.status(400).json({ error: 'Todos os campos (nome, email, senha, permissoes) são obrigatórios' });
        }

        nome = nome.toLowerCase().trim();
        email = email.toLowerCase().trim();

       const usuarioExistente = await Usuario.findOne({
            $or: [
                { nome: nome },
                { email: email }
            ]
        });

        if (usuarioExistente) {
            if (usuarioExistente.nome === nome) {
                console.log(usuarioExistente.nome, '=', nome);
                return res.status(400).json({ error: `O nome de usuário '${nome}' já está em uso.` });
            } else if (usuarioExistente.email === email) {
                return res.status(400).json({ error: `O email '${email}' já está em uso.` });
            }
        }
        

        const hashedSenha = await bcrypt.hash(senha, 10);

        const novoUsuario = new Usuario({
            nome,
            email,
            senha: hashedSenha,
            permissoes
        });

        await novoUsuario.save();

        res.status(201).json({ message: 'Novo usuário criado com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao salvar novo usuário', details: err.message });
    }
};


exports.obterUsuarios = async (req, res) => {
    try {
      const usuarios = await Usuario.find().select('nome');
      res.status(200).json({ usuarios: usuarios });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter usuários', details: error.message });
    }
};
  
exports.deletarUsuario = async (req, res) => {
    const { id } = req.params; 
  
    try {
      const usuarioDeletado = await Usuario.findByIdAndDelete(id);
      if (!usuarioDeletado) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      res.status(200).json({ message: 'Usuário deletado com sucesso', usuario: usuarioDeletado });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário', details: error.message });
    }
};


