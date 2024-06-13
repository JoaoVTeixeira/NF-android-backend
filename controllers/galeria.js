const Galeria = require("../models/galeria");

exports.getGaleria = async (req, res) => {
  try {
    const galeria = await Galeria.GaleriaModel.find();
    res.json(galeria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGaleriaId = async (req, res) => {
  try {
    res.status(201).json(await Galeria.GaleriaModel.findById(req.params.id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createGaleria = async (req, res) => {
  try {
    res.status(201).json(await Galeria.GaleriaModel.create(req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateGaleria = async (req, res) => {
  try {
    res.status(201).json(await Galeria.GaleriaModel.findByIdAndUpdate(req.params.id, req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteGaleria = async (req, res) => {
  try {
    res.status(201).json(await Galeria.GaleriaModel.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
