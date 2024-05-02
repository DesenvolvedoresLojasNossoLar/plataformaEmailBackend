const express = require('express');
const router = express.Router();
const iframeRoutes = require('./iframes/iframes');
const emailRoutes = require ('./emails/emailMarketing/email')
const emailCrediarioRoutes = require ('./emails/emailCrediario/emailCrediario')
const loginRoutes = require('./login/login');
const usuariosRoutes = require ('./usuarios/mostrarUsuarios.js')

router.use('/api/crediario', emailCrediarioRoutes);
router.use('/api', emailRoutes);
router.use('/api/iframes', iframeRoutes);
router.use('/api/users', usuariosRoutes);
router.use('/login', loginRoutes);


module.exports = router;
