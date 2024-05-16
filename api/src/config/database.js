const mongoose = require('mongoose');

const conectarMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/lojasNossoLarPlataform');
        console.log('Conexão com o MongoDB estabelecida com sucesso');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
    }
};

// Chama a função de conexão ao MongoDB
conectarMongoDB();

// Exporta a instância do Mongoose
module.exports = mongoose;

