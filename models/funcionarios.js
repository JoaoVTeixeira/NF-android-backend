const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_HOST, { useNewUrlParser: true });

var Schema = mongoose.Schema;

const Funcionario = new Schema({


    id: { type: Number, required: true },
    idade: { type: Number, required: true },
    nome: { type: String, required: true },
    experiencia: { type: String, required: true },
    especialidades: { type: Array, required: true },
    barbearia_id: { type: String, required: true },
    images: { type: String },
    avaliacao: {type: Array}

})

const FuncionarioModel = mongoose.model('funcionarios', Funcionario);


module.exports = { FuncionarioModel }