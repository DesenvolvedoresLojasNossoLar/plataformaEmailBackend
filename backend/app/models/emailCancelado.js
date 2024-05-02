const { ref, query, orderByChild, equalTo, get, push, child } = require("firebase/database");

// Função para verificar se o e-mail já foi cancelado
const emailJaCancelado = async (db, email) => {
    const usuariosRef = child(ref(db), 'emailsExcluidos'); 
    const usuariosQuery = query(usuariosRef, orderByChild('email'), equalTo(email));
    const snapshot = await get(usuariosQuery);
    return snapshot.exists();
};

// Função para adicionar o e-mail cancelado ao banco de dados
const adicionarEmailCancelado = async (db, email) => {
    const usuariosRef = child(ref(db), 'emailsExcluidos'); 
    await push(usuariosRef, {
        email: email,
        status: 'cancelado'
    });
};

module.exports = { emailJaCancelado, adicionarEmailCancelado };