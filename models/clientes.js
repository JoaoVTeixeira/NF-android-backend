const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_HOST, { useNewUrlParser: true});

var Schema = mongoose.Schema;


const Clientes = new Schema ({

    nome        : {type:String, required: true},
    email       : {type:String, required: true},
    tel         : {type:String, required: true}
    
})

const ClienteModel = mongoose.model('clientes', Clientes)

module.exports = {ClienteModel}