const { ClienteModel } = require('../models/clientes.js');

exports.getCliente = async(req, res) => {
    try {
        const clientes = await ClienteModel.find()
        res.json(clientes)
    }catch(error) {
        res.status(500).json({ message: error.message });

    }
}

exports.getClienteId = async (req, res) => {
  try {
    res.status(201).json(await ClienteModel.findById(req.params.id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClienteByCPF = async (req, res) => {
  try {
    const clientes = await ClienteModel.find({cpf: `${req.params.cpf}`})
    res.json(clientes)
}catch(error) {
    res.status(500).json({ message: error.message });

}
};

exports.createCliente = async (req, res) => {
    try {

      const cliente = {
        _id: req.body._id,
        nome: req.body.nome,
        email: req.body.email,
        tel: req.body.telefone,
      }

      res.status(201).json(await ClienteModel.create(cliente));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  exports.updateCliente = async (req, res) => {
    try {

      const cliente = {
        nome: req.body.nome,
        email: req.body.email,
        tel: req.body.tel
      }


      res.status(201).json(await ClienteModel.findByIdAndUpdate(req.params.id, cliente
        ))
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  exports.deleteCliente = async (req, res) => {
    try {
      res.status(201).json(await ClienteModel.findByIdAndDelete(req.params.id))
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
