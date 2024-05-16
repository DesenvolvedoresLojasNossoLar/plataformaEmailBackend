const express = require('express');
const router = express.Router();
const { criarUsuario, obterUsuarios, deletarUsuario }= require('../../app/controllers/users/users');

// Rota para criar um novo usuário
router.post('/cadastrarUsuario',criarUsuario);
router.get ('/visualizarUsuarios',obterUsuarios);
router.delete('/deletarUsuario/:id',deletarUsuario);

module.exports = router;












