const nodeMailer = require('nodemailer');
const { remetentes } = require('./remetenteController');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');


//nodemailer transporter de conexão
const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: remetentes[0].user,
        pass: remetentes[0].pass 
    }
});

function mascaraRemetente(remetente) {
    if (remetente === 'claysonalvesdesousa321@gmail.com') {
        return 'Super Lojas Nosso Lar';
    } else if (remetente === 'pedidosonline@lojasnossolar.com.br') {
        return 'Super Lojas Nosso Lar';
    }

    return remetente;
}

//enviar o email
const sendEmails = async (remetentes, emailClients, nomeClient, template) => {
    try {
        const remetenteMascarado = mascaraRemetente(remetentes);

        console.log('Template enviado:', template);
        // Iterar sobre os e-mails dos destinatários
        for (let i = 0; i < emailClients.length; i++) {
            const destinatario = emailClients[i];

            // Caminho para o arquivo de template do e-mail
            const templatePath = path.join(__dirname, `../../../views/templatesEmails/templateMarketing/${template}`);

            // Renderizar o conteúdo HTML do e-mail a partir do template e dos dados fornecidos
            const htmlContent = await ejs.renderFile(templatePath, { nomeClient, destinatario });

            // Construir o URL de cancelamento (se necessário)
            const cancelURL = `https://www.norteoutlet.com.br/email/confirmarCancelamento?email=${destinatario}&nomeClient=${nomeClient}`;

            // Substituir as tags do template pelos valores correspondentes
            const htmlContentWithClientName = htmlContent.replace('{{nomeClient}}', nomeClient)
                                                         .replace('{{cancelURL}}', cancelURL);

            console.log('HTML enviado:', htmlContentWithClientName); // Adicionado o console.log para verificar o HTML sendo enviado

            // Configuração do e-mail a ser enviado
            let mail = {
                from: `"${remetenteMascarado}" <${remetentes[0].user}>`,
                to: destinatario,
                subject: "#AbrilMaluco",
                html: htmlContentWithClientName
            };

            // Enviar o e-mail utilizando o transporter do NodeMailer
            await transporter.sendMail(mail);
        }

        // Se tudo ocorrer bem, retornar true
        return true;
    } catch (error) {
        // Se ocorrer algum erro, lançar uma exceção
        throw new Error('Erro ao enviar e-mails: ' + error.message);
    }
};



// Recebendo o email
const enviarEmailController = async (req, res) => {
    try {
        console.log(req.body);
        const { remetente, destinatarios, template } = req.body; // Corrigido aqui

        console.log("Remetente:", remetente);
        console.log("Destinatários:", destinatarios);      

        destinatarios.forEach(destinatario => {
            const emailClient = destinatario.email;
            const nomeClient = destinatario.nome;
        
            console.log(`Email do cliente: ${emailClient}, Nome do cliente: ${nomeClient}, template ${template}`);

            // Chamar a função sendEmails para enviar e-mails para cada destinatário
            sendEmails(remetente, [emailClient], nomeClient, template)
                .then(() => console.log("E-mail enviado com sucesso para", nomeClient))
                .catch(error => console.error("Erro ao enviar e-mails para", nomeClient, ":", error));
        });
        
        res.json({ success: true, message: "E-mails enviados com sucesso" });
    } catch (error) {
        console.error("Erro ao enviar e-mails:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};



module.exports = { enviarEmailController };
