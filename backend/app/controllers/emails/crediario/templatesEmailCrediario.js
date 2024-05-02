const { listTemplates, renderTemplate } = require('../viewsTemplates');

function listTemplateEmails(req, res) {
    listTemplates(req, res, 'templateCrediario');
}

// Para renderizar um modelo de marketing
function renderTemplateEmail(req, res) {
    renderTemplate(req, res, 'templateCrediario');
}

module.exports = {listTemplateEmails, renderTemplateEmail} 

