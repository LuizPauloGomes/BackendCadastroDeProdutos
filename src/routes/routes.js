const express = require('express');
const produtoController = require ('../controllers/produtoController.js');
const router = express.Router();
 
router.post('/produto', produtoController.Insert);
router.get('/produto', produtoController.SelectAll);
router.get('/produto/:cod', produtoController.SelectDetail);
router.put('/produto/:cod', produtoController.Update);
router.delete('/produto/:cod', produtoController.Delete);
 
module.exports = router;