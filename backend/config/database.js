/* const sql = require('mssql');

const config = {
    user: 'seu_usuario',
    password: 'sua_senha',
    server: 'endpoint_do_banco_de_dados',
    database: 'nome_do_banco_de_dados',
    options: {
        encrypt: true 
    }
};

async function conectarBancoDeDados() {
    try {
        await sql.connect(config);
        console.log('Conectado ao banco de dados');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
}

conectarBancoDeDados();
 */


const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyA5u3cVeBAwaHh7Up9N98GVBEKWJhnISM8",
  authDomain: "emailplataforma.firebaseapp.com",
  projectId: "emailplataforma",
  storageBucket: "emailplataforma.appspot.com",
  messagingSenderId: "963881003795",
  appId: "1:963881003795:web:b1987bd2ac1cb7ab8188e6"
};


const firebaseApp = initializeApp(firebaseConfig)
const db = getDatabase(firebaseApp);

module.exports = db;