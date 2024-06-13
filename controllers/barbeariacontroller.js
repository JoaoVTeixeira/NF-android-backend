const { BarbeariaModel } = require('../models/barbearia.js');

exports.getBarbearia = async(req, res) => {
    try {
        const barbearias = await BarbeariaModel.find()
        res.json(barbearias)
    }catch(error) {
        res.status(500).json({ message: error.message });

    }
}

exports.getBarbeariaId = async (req, res) => {
  try {
    res.status(201).json(await BarbeariaModel.findById(req.params.id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBarbeariaByCPF = async (req, res) => {
  try {
    const barbearias = await BarbeariaModel.find({cpf: `${req.params.cpf}`})
    res.json(barbearias)
}catch(error) {
    res.status(500).json({ message: error.message });

}
};

exports.createBarbearia = async (req, res) => {
    try {
      res.status(201).json(await BarbeariaModel.create(req.body));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  exports.updateBarbearia = async (req, res) => {
    try {
      res.status(201).json(await BarbeariaModel.findByIdAndUpdate(req.params.id, req.body))
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  exports.deleteBarbearia = async (req, res) => {
    try {
      res.status(201).json(await BarbeariaModel.findByIdAndDelete(req.params.id))
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
