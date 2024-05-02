const { autenticarUsuario } = require('../../models/consultarUsuario');



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

  
module.exports = { postLogin };