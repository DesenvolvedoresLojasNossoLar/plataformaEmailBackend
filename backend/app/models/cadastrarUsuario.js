const { ref, push, set, get, query, orderByChild, equalTo } = require("firebase/database");
const bcrypt = require('bcrypt');
const db = require('../../config/database');

class UserController {
  static async cadastrarUsuario(req, res) {
    const { nome, email, senha } = req.body;

    // Verificar se o e-mail já existe
    const usersRef = ref(db, "Users");
    const emailQuery = query(usersRef, orderByChild("email"), equalTo(email));

    get(emailQuery).then((snapshot) => {
      if (snapshot.exists()) {
        // Se o e-mail já existe, retornar um erro
        res.status(400).json({ error: 'E-mail já cadastrado' });
      } else {
        // Gerar o hash da senha e adicionar o novo usuário
        bcrypt.hash(senha, 10, (err, hash) => {
          if (err) {
            console.error('Erro ao gerar hash da senha:', err);
            res.status(500).json({ error: 'Erro ao cadastrar usuário' });
            return;
          }

          const novoUsuario = {
            nome: nome,
            email: email,
            senha: hash
          };

          // Adicionar o novo usuário ao banco de dados
          const novoUsuarioRef = push(usersRef);
          set(novoUsuarioRef, novoUsuario)
            .then(() => {
              res.status(201).json({ message: "Usuário cadastrado com sucesso" });
            })
            .catch((error) => {
              console.error("Erro ao adicionar novo usuário:", error);
              res.status(500).json({ error: 'Erro ao cadastrar usuário' });
            });
        });
      }
    }).catch((error) => {
      console.error("Erro ao verificar e-mail existente:", error);
      res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    });
  }
}

module.exports = UserController;

