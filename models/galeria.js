const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_HOST, { useNewUrlParser: true });

const Schema = mongoose.Schema;

const GaleriasSchema = new Schema({
  idBarbeiro: { type: String, required: true },
  idCliente: { type: String, required: true },
  nota: { type: Number, required: true }
});

const GaleriaModel = mongoose.model('Galerias', GaleriasSchema);

module.exports = { GaleriaModel };
