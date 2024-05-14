const express = require('express');
const router = express.Router();
const { enviarAudio } = require('../../app/controllers/whatsAppMarketing/enviarMensagem');

router.post('/enviar-audio', async (req, res) => {
  try {
    // Verifica se o corpo da requisição possui o campo 'numero'
    if (!req.body.numero || req.body.numero.length === 0) {
      return res.status(400).send('Número de telefone ausente no corpo da requisição.');
    }

    // Extrai o número de telefone do array recebido
    const numero = req.body.numero[0] + '@c.us';

    // Chama a função enviarAudio do controlador e passa o número de telefone
    const resultado = await enviarAudio(numero);

    // Envia a resposta
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
