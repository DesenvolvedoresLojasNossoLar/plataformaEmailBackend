const bcrypt = require('bcrypt');
const Usuario = require('../../models/usuarios');

exports.obterUsuarios = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado no banco de dados' });
    }

    const senhaCorrespondente = await bcrypt.compare(senha, usuario.senha);

    if (senhaCorrespondente) {
      return res.status(200).json({
        nome: usuario.nome,
        email: usuario.email,
        permissoes: usuario.permissoes
      });
    } else {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro durante a autenticação', details: error.message });
  }
};
























/* const { autenticarUsuario } = require('../../models/consultarUsuario');

function postLogin(req, res) {
  const { email, password } = req.body;

  console.log("email no meu backend:", email, "senha no backend", password)
  
  autenticarUsuario(email, password, (error, usuario) => {
    if (error) {
      return res.status(401).send(error.message);
    }

    console.log('Login bem-sucedido!');

    
    res.status(200).json({
      nome: usuario.nome,
      email: usuario.email,

    });
  });

}

  
module.exports = { postLogin }; */