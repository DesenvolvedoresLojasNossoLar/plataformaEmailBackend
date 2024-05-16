const express = require('express');
const router = express.Router();
const iframeRoutes = require('./iframes/iframes.js');
const emailRoutes = require ('./emails/emailMarketing/email.js')
const emailCrediarioRoutes = require ('./emails/emailCrediario/emailCrediario.js')
const loginRoutes = require('./login/login.js');
const usuariosRoutes = require ('./usuarios/mostrarUsuarios.js')
const whatsRoutes = require ('./whatsAppMarketing/enviarMensagem.js')

router.use('/api/crediario', emailCrediarioRoutes);
router.use('/api', emailRoutes);
router.use('/api/iframes', iframeRoutes);
router.use('/api/users', usuariosRoutes);
router.use('/login', loginRoutes);
router.use('/apiWhats', whatsRoutes)

module.exports = router;
