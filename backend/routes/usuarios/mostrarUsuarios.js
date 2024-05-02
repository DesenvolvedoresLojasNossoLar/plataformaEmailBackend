const express = require('express');
const router = express.Router();

const  userController = require('../../app/models/mostrarTodosUsuarios');
const  CadastrarController = require('../../app/models/cadastrarUsuario');


router.get("/", userController.getUsers);
router.post("/cadastrarUsuarios", CadastrarController.cadastrarUsuario)
router.delete('/:userId', userController.excluirUsuario);


module.exports = router;