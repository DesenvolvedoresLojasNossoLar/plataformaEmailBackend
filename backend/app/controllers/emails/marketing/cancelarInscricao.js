const { emailJaCancelado, adicionarEmailCancelado } = require('../../../models/emailCancelado');
const db = require('../../../../config/database');



const unsubscribe = async (req, res) => {
    try {
        const email = req.query.email;
        
        const emailCancelado = await emailJaCancelado(db, email);
        if (emailCancelado) {
            return res.send('Seu e-mail já foi cancelado anteriormente.');
        }

        await adicionarEmailCancelado(db, email);
        
        res.send('Seu e-mail foi cancelado com sucesso.');
    } catch (error) {
        console.error('Erro ao processar a solicitação de cancelamento de inscrição:', error);
        res.status(500).send('Erro ao processar a solicitação');
    }
};


module.exports = { unsubscribe };

//test