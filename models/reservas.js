const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_HOST, { useNewUrlParser: true});

var Schema = mongoose.Schema;

var reservaSchema = new Schema ({

    barbeiro    : { type:String, required: true},
    barbeiroNome    : { type:String, required: true},
    cliente     : { type:String, required: true},
    data        : { type:Date, required: true},            
    horas       : { type:String, required: true},
    unidade     : { type:String, required: true},
    unidadeNome     : { type:String, required: true},
    status      : { type:String, required: true}    
})

const ReservaModel = mongoose.model('Reservas', reservaSchema);


module.exports = {ReservaModel}