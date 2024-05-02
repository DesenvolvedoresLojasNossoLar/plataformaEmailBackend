const sql = require('mssql');

// Configuração da conexão
const config = {
    user: 'sa',
    password: 'clayson39',
    server: 'ECOM1501/TESTE', 
    port: 1433, // porta padrão do SQL Server
    database: 'teste',
    options: {
      trustServerCertificate: true // Desativa a verificação do certificado SSL
    }
  };
  



// Conectar ao banco de dados
sql.connect(config).then(() => {
    console.log('Conexão estabelecida com sucesso!');
}).catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
});
