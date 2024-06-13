const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_HOST, { useNewUrlParser: true});

var Schema = mongoose.Schema;


const Barbearias = new Schema ({

    id:      {type: Number, required: true},
    nome     : {type:String, required: true},
    endereço : {type:String, required: true},
    cidade      : {type:String, required: true},
    estado: {type:String, required: true},
    telefone: {type:String, required: true},
    email: {type:String, required: true},
    site: {type:String, required: true},
    horario_funcionamento: {type:String, required: true},
    images: {type: String, required:true}
    
})

const BarbeariaModel = mongoose.model('barbearias', Barbearias)

module.exports = {BarbeariaModel}