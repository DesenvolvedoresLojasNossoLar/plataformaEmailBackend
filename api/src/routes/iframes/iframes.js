const express = require('express');
const router = express.Router();
const path = require('path');
const { main } = require('../../app/controllers/iframes/iframesController');

router.get('/', async (req, res) => {
  try {
    const data = await main();
    console.log('retornando', data)
    res.json(data);
  } catch (error) {
    console.error("Erro ao obter dados do servidor:", error);
    res.status(500).json({ error: "Erro ao obter dados do servidor" });
  }
});

router.get('/*', (req, res) => {
    
    const filePath = path.join(__dirname, '..','..','app','views', 'iframes', req.params[0] + '.html');
    res.sendFile(filePath);
});

module.exports = router;
