const { FuncionarioModel } = require("../models/funcionarios.js");

exports.getFuncionario = async (req, res) => {
  try {
    const funcionarios = await FuncionarioModel.find();
    res.json(funcionarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFuncionarioId = async (req, res) => {
  try {
    res.status(201).json(await FuncionarioModel.findById(req.params.id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBarbeiro = async (req, res) => {
  try {
    res.status(200).json(await FuncionarioModel.find({funcao: "BARBEIRO"}));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBarbeiroByUnidade = async (req, res) => {

  const id = req.params.id

  try {
    res.status(200).json(await FuncionarioModel.find({unidade: id, funcao: "BARBEIRO"}));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFuncionario = async (req, res) => {
  try {
    
    res.status(201).json(await FuncionarioModel.create(req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateFuncionario = async (req, res) => {
  try {
    res
      .status(201)
      .json(await FuncionarioModel.findByIdAndUpdate(req.params.id, req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFuncionario = async (req, res) => {
  try {
    res.status(201).json(await FuncionarioModel.findByIdAndDelete(req.params.id));

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
