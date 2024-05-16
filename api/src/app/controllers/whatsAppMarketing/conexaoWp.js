/* const venom = require("venom-bot");

// Singleton para o cliente do Venom
class ClientWhats {
  constructor() {
    this.client = null;
  }

  async iniciar() {
    try {
      if (!this.client) {
        this.client = await venom.create({
          session: "chatGPT_BOT",
          multidevice: true
        });
        console.log("Cliente do Venom pronto!");
      }
      return this.client;
    } catch (err) {
      console.log(err);
      throw new Error('Erro ao criar conexão Venom.');
    }
  }

  obterCliente() {
    if (!this.client) {
      throw new Error('Cliente do Venom não está pronto!');
    }
    return this.client;
  }
}

const clientWhatsInstance = new ClientWhats();

module.exports = clientWhatsInstance;
 */