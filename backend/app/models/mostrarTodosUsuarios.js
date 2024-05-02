const { ref, get, remove, child } = require("firebase/database");
const db = require('../../config/database');

class UserController {
  static async getUsers(req, res) {
    const usersRef = ref(db, "Users");

    try {
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {

        const usuarios = snapshot.val();

        console.log('usuarios id',usuarios);
        
        const usersData = Object.values(usuarios).map(user => ({
          id: Object.keys(usuarios).find(key => usuarios[key] === user),
          nome: user.nome,
          email: user.email,
        }));
        
        console.log(usersData)
        res.status(200).json({ users: usersData });
      } else {
        res.status(404).json({ error: "Nenhum usuário encontrado" });
      }
    } catch (error) {
      console.error("Erro ao consultar o banco de dados Firebase:", error);
      res.status(500).json({ error: "Erro ao consultar o banco de dados Firebase" });
    }
  }

  static async excluirUsuario(req, res) {
    const { userId } = req.params; // ID do usuário a ser excluído
  
    // Referência ao nó de usuários no banco de dados
    const usersRef = ref(db, "Users");
  
    // Referência ao usuário específico a ser excluído
    const usuarioRef = child(usersRef, userId);
  
    // Remover o usuário do banco de dados
    remove(usuarioRef)
    .then(() => {
      res.status(200).json({ message: "Usuário excluído com sucesso" });
    })
    .catch((error) => {
      console.error("Erro ao excluir usuário:", error);
      res.status(500).json({ error: 'Erro ao excluir usuário' });
    });
  }
}

module.exports = UserController;

