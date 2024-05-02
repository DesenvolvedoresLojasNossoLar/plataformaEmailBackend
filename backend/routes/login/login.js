const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const {postLogin} = require('../../app/controllers/login/loginController');


router.post('/', bodyParser.urlencoded({ extended: true }), postLogin);

module.exports = router;