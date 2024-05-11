const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/lojasNossoLarPlataform')
    .then(() => console.log("Conectado ao MongoDB com sucesso!"))
    .catch((err) => console.error(err));