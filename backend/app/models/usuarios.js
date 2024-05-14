const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  permissoes: {
    type: Number,
    required: true,
    enum: [1, 2, 3]
  }
});

// Criar o modelo do usuário
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario; 