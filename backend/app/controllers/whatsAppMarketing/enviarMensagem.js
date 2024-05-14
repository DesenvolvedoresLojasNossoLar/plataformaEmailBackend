const clientWhats = require('./conexaoWp');
const path = require('path');

let cliente = null; 

clientWhats.iniciar()
  .then(client => {
    cliente = client;
    console.log("Cliente do Venom pronto!");
  })
  .catch(error => {
    console.error('Erro ao iniciar o cliente do Venom:', error);
  });

async function enviarAudio(numero) {

  try {
    if (!cliente) {
      throw new Error('Cliente do Venom não está pronto!');
    }
    const caminhoAbsoluto = path.resolve(__dirname, '../../../public/audios/tainaPromocaoMae.mp3');
    await cliente.sendVoice(numero, caminhoAbsoluto);

    const mensagem = 'Link a seguir para acessar nosso site: https://www.lojasnossolar.com.br/';
    await cliente.sendText(numero, mensagem);

    console.log('numero enviado',numero)

    console.log('Solicitação de envio de áudio recebida para', numero);
    return 'Solicitação de envio de áudio recebida com sucesso!';
  } catch (error) {
    console.error('Erro ao enviar a solicitação de envio de áudio:', error);
    throw new Error('Erro ao enviar a solicitação de envio de áudio');
  }
}

module.exports = {
  enviarAudio
};
