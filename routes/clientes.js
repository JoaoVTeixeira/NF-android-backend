const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clientecontroller.js');

router.get('/', clienteController.getCliente);
router.get('/:id', clienteController.getClienteId);
router.get('/cpf/:cpf', clienteController.getClienteByCPF);

router.post('/', clienteController.createCliente);
router.put('/:id', clienteController.updateCliente);
router.delete('/:id', clienteController.deleteCliente);


module.exports = router;