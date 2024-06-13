const express = require('express');
const router = express.Router();
const barbeariaController = require('../controllers/barbeariacontroller.js');

router.get('/', barbeariaController.getBarbearia);
router.get('/:id', barbeariaController.getBarbeariaId);
router.get('/cpf/:cpf', barbeariaController.getBarbeariaByCPF);

router.post('/', barbeariaController.createBarbearia);
router.put('/:id', barbeariaController.updateBarbearia);
router.delete('/:id', barbeariaController.deleteBarbearia);


module.exports = router;