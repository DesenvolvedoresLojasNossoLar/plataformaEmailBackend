const fs = require('fs');
const path = require('path');

function listTemplates(req, res, templateDirectory) {
    const templatesPath = path.join(__dirname, '..', '..', 'views', 'templatesEmails', templateDirectory);

    fs.readdir(templatesPath, (err, files) => {
        if (err) {
            console.error('Erro ao ler a pasta de modelos:', err);
            return res.status(500).send('Erro ao ler a pasta de modelos');
        }

        const ejsFiles = files.filter(file => path.extname(file) === '.ejs');

        const templateLinks = ejsFiles.map(file => {
            return {
                name: file,
                link: `/${file}` 
            };
        });

        res.json({ templates: templateLinks });
    });
}

function renderTemplate(req, res, templateDirectory) {
    const templatesPath = path.join(__dirname, '..', '..', 'views', 'templatesEmails', templateDirectory);

    const filename = req.params.filename;

    if (!filename) {
        return res.status(400).send('Nome do arquivo não fornecido');
    }

    fs.access(path.join(templatesPath, filename), fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Erro ao acessar o arquivo:', err);
            return res.status(404).send('Arquivo não encontrado');
        }

        res.render(path.join(templatesPath, filename));
    });
}

module.exports = { listTemplates, renderTemplate };
