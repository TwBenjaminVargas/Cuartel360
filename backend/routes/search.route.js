const express = require('express');
const router = express.Router();
const searchService = require('../service/search.service');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/api/search',authMiddleware(1), async (req, res) =>
{
  try
  {
    const { term } = req.query;    
    if (!term || term.length < 2)
      return res.json([]);
    result = await searchService.searchBombero(term);
    return res.json(result);
  }
  catch (error)
  {
    res.status(500).json({ error: 'Error en la búsqueda' });
  }
});

module.exports = router;