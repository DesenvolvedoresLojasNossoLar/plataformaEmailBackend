const { listTemplates, renderTemplate } = require('../../viewsTemplates');

function listTemplateEmails(req, res) {
    listTemplates(req, res, 'templateMarketing');
}

function renderTemplateEmail(req, res) {
    renderTemplate(req, res, 'templateMarketing');
}

module.exports = {listTemplateEmails, renderTemplateEmail} 