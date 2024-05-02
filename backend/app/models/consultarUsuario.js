const bcrypt = require('bcrypt');
const { ref, get } = require("firebase/database")
const db = require('../../config/database')

function autenticarUsuario(email, password, callback) {
    const usersRef = ref(db, "Users");
  
    get(usersRef).then((snapshot) => {
      if (snapshot.exists()) {
        const usuarios = snapshot.val();
  
        const usuario = Object.values(usuarios).find(user => user.email === email);
        
        if (!usuario) {
         
          callback(new Error('Usuário não encontrado'), null);
          return;
        }
  
       
        bcrypt.compare(password, usuario.senha, (err, result) => {
          if (err) {
            console.error('Erro ao comparar as senhas:', err);
            callback(err, null);
            return;
          }
  
          if (result) {
            
            callback(null, usuario);
          } else {
            
            callback(new Error('Credenciais inválidas'), null);
          }
        });
      } else {
       
        callback(new Error('Usuário não encontrado'), null);
      }
    }).catch((error) => {
      console.error('Erro ao consultar o banco de dados Firebase:', error);
      callback(error, null);
    });
}
  
module.exports = {autenticarUsuario};