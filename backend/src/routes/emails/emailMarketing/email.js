const express = require('express');
const router = express.Router();

const {enviarEmailController} = require('../../../app/controllers/emails/marketing/enviarEmailsController');
const {getRemetentes} = require('../../../app/controllers/emails/marketing/remetenteController');
/* const {viewTemplateEmails} = require ('../../../app/controllers/emails/templateEmails/viewTemplateEmails') */

const {listTemplateEmails, renderTemplateEmail} = require ('../../../app/controllers/emails/marketing/templateEmails/viewTemplateEmails')




router.post('/enviar-email', enviarEmailController);
router.get('/remetentes', getRemetentes);
router.get('/templateEmails', listTemplateEmails)
router.get('/templateEmails/:filename', renderTemplateEmail);


module.exports = router;































/* const express = require('express');
const nodeMailer = require('nodemailer');
const path = require('path');
const router = express.Router();
const fs = require('fs');
 
router.get('/', (req, res) => {
    const emailPath = path.join(__dirname, '..', 'views', 'email', 'email.html');
    res.sendFile(emailPath);
});

const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "claysonalvesdesousa321@gmail.com",
        pass: "ztjparadkanblfdl"
    }
});

router.post('/enviar-email', async (req, res) => {
    try {
        if (!req.body.recipients || !Array.isArray(req.body.recipients)) {
            throw new Error("Nenhum destinatário fornecido ou formato inválido");
        }

        const recipients = req.body.recipients;

        if (recipients.length === 0) {
            throw new Error("Nenhum endereço de e-mail fornecido");
        }

        console.log(recipients); 

        await sendEmails(recipients);

        res.send("E-mails enviados com sucesso");
    } catch (error) {
        console.error("Erro ao enviar e-mails:", error);
        res.status(400).send(error.message);
    }
});


async function sendEmails(recipients) {
    for (const recipient of recipients) {
      
        let mail = {
            from: "claysonalvesdesousa321@gmail.com",
            to: recipient,
            subject: "Testando novamente",
            html: `<h1>Olá</h1>`
        };

        await transporter.sendMail(mail);
        console.log("E-mail enviado para", recipient);
    }
}

router.get('/remetente', (req, res) => {
    res.json({ from: "claysonalvesdesousa321@gmail.com" });
});


module.exports = router;


    
 */