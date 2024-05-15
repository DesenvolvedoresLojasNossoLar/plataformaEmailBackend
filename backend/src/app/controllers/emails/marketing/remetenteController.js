// remetentes que sera exibidos na view de email 
const remetentes = [
  
    { user: "pedidosonline@lojasnossolar.com.br", pass: "nossolarvendasonline123"}
];

function getRemetentes(req, res) {
    const remetentesSemSenha = remetentes.map(({user}) => ({ user }));
    res.json({ remetentes: remetentesSemSenha });
}

module.exports = {remetentes ,getRemetentes};