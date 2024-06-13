const express = require('express');
const router = express.Router();

const GaleriaController = require('../controllers/galeria');

router.get('/', GaleriaController.getGaleria);
router.get('/:id', GaleriaController.getGaleriaId);
router.post('/', GaleriaController.createGaleria);
router.put('/:id', GaleriaController.updateGaleria);
router.delete('/:id', GaleriaController.deleteGaleria);

module.exports = router;
