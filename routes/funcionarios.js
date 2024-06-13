const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionariocontroller.js');

router.get('/', funcionarioController.getFuncionario);
router.get('/barbeiro', funcionarioController.getBarbeiro);
router.get('/unidades/:id', funcionarioController.getBarbeiroByUnidade);

router.get('/:id', funcionarioController.getFuncionarioId);

router.post('/', funcionarioController.createFuncionario);
router.put('/:id', funcionarioController.updateFuncionario);
router.delete('/:id', funcionarioController.deleteFuncionario);


module.exports = router;