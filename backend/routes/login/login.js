const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const {obterUsuarios} = require('../../app/controllers/login/loginController');


router.post('/', bodyParser.urlencoded({ extended: true }), obterUsuarios);

module.exports = router;