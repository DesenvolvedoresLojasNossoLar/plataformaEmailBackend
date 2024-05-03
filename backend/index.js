const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 80;


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Rota para obter uma lista de usuários
const routes = require('./routes');
app.use('/', routes);

// Cria o servidor HTTP
const server = http.createServer(app);

// Inicia o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://marketinglojasnossolar.com.br:${PORT}`);
});
