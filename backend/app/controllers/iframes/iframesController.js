const path = require('path');
const fs = require('fs').promises;

async function main() {
    const directoryPath = './app/views/iframes';
    try {
        return await listSubfoldersAndPages(directoryPath);
    } catch (error) {
        console.error('Erro ao listar subpastas e páginas:', error);
        throw error;
    }
}

async function listSubfoldersAndPages(dir, baseUrl = '') {
    try {
        const items = await fs.readdir(dir);
        const foldersAndPages = [];

        for (const item of items) {
            const itemPath = path.join(dir, item);
            const stats = await fs.stat(itemPath);

            if (stats.isDirectory()) {
                // Construir o URL da subpasta
                const folderUrl = baseUrl + '/' + item;
                const subItems = await listSubfoldersAndPages(itemPath, folderUrl);
                const pages = subItems.flatMap(subItem => subItem.pages);
                foldersAndPages.push({
                    folder: item,
                    folderUrl: folderUrl,
                    pages: pages,
                    subfolders: subItems
                });
            } else if (item.endsWith('.html')) {
                // Construir o URL da página
                const pageUrl = baseUrl + '/' + item.replace('.html', '');
                const fullPageUrl = baseUrl + '/' + item.replace('.html', ''); // Remover a extensão .html
                console.log('URL da página:', fullPageUrl);
                foldersAndPages.push({
                    folder: '',
                    folderUrl: baseUrl,
                    pages: [{ name: item.replace('.html', ''), url: fullPageUrl }], // Usar a URL completa
                    subfolders: []
                });
            }
        }

        return foldersAndPages;
    } catch (error) {
        console.error('Erro ao listar subpastas e páginas:', error);
        throw error;
    }
}

module.exports = { main };
