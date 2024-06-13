var express = require('express');
var router = express.Router();
const UsersController = require('../controllers/usuariocontroller')


/* GET users listing. */
router.get('/', UsersController.getAllUsers);
router.post('/login', UsersController.ValidaUser);
router.post('/logindash', UsersController.ValidaUserDash);

router.post('/cadastrar', UsersController.CreateUser);
router.put('/atualizar/:id', UsersController.UpdateUser);
router.delete('/deletar/:id', UsersController.deleteUser);


module.exports = router;
