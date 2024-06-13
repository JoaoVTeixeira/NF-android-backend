var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/funcionarios', async function(req, res, next) {

  const db = require('../db');
  const funcionarios = await db.findAll("funcionarios");
  
  res.render('funcionarios',{funcionarios});


});



router.post('/funcionarios', async function(req,res,next) {
  const db = require('../db');

  const funcionario = req.body;

  console.log(funcionario);

  db.insert("funcionarios",funcionario);

  res.redirect('/funcionarios');


})



router.get('/funcionario/apagar/:id', async function(req,res,next) {
  const db = require('../db');

  const funcionario = req.params.id;

  console.log(funcionario);

  db.deleteDb("funcionarios",funcionario)

  res.redirect('/funcionarios');


})


router.get('/clientes', async function(req, res, next) {

  const db = require('../db');
  const clientes = await db.findAll("clientes");
  
  res.render('clientes',{clientes, acao: 'clientes'});


});


router.get('/clientes/update/:id', async function(req,res,next){

  
  const db = require('../db')

  const id = req.params.id;


  const clientesFind = await db.findOne("clientes",id);
  const clientes = [{ ...clientesFind}]
  console.log(clientes[0].nome)

  res.render('clientes', {clientes, acao:'update'})

})

router.post('/clientes/update/:id', async (req,res,next)=>{

  const db = require('../db');
  const id = req.params.id;
  const cliente = req.body;
  
  db.updateOne('clientes', id, cliente);

  res.redirect('/clientes');

})



router.get('/clientes/apagar/:id', async function(req,res,next) {
  const db = require('../db');

  const cliente = req.params.id;

  db.deleteDb("clientes",cliente)

  res.redirect('/clientes');


})



router.post('/clientes', async function(req,res,next) {
  const db = require('../db');
  
  const cliente = req.body;

  //console.log(cliente);

  db.insert("clientes", cliente);

  res.redirect('/clientes');


})



module.exports = router;
