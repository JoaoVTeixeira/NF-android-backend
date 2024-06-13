const reserva = require('../models/reservas')

// apenas para testes
exports.getReservas = async(req, res) => {
  try {
      const reservas = await reserva.ReservaModel.find();
      res.json(reservas)
  }catch(error) {
      res.status(500).json({ message: error.message });

  }
}

// apenas para testes
exports.getReservasByClientId = async(req, res) => {
  try {
      const reservas = await reserva.ReservaModel.find({cliente: `${req.params.id}`, status:"R"});
      res.status(200).json(reservas)
  }catch(error) {
      res.status(500).json({ message: error.message });

  }
}







exports.consultaDatasReservas = async (req, res) => {   
  const { inicio, fim } = req.query;

  // Verifica se os parâmetros estão presentes
  if (!inicio || !fim) {
    res.status(400).json({ message: 'Parâmetros inválidos' });
  } else {
    // Converte as datas para objetos Date
    const inicioData = new Date(inicio);
    const fimData = new Date(fim);

    // Verifica se as datas são válidas
    if (isNaN(inicioData.getTime()) || isNaN(fimData.getTime())) {
      res.status(400).json({ message: 'Datas inválidas' });
    } else if (fimData < inicioData) {
      res.status(400).json({ message: 'A data final deve ser posterior à data inicial' });
    } else {
      // Executa a consulta no banco de dados
      const response = await reserva.ReservaModel.find({ data: { $gte: inicioData, $lte: fimData } }, (err, resultados) => {
        if (err) {
          console.error(err);
        } else {
          console.log(resultados);
        }
      });
      
      res.send(response.data);
    }
  }
};

exports.consultaSalasReservas = async (req, res) => {   
  const sala_reserva = req.query.sala;

  // Verifica se os parâmetros estão presentes
  if (!sala) {
    res.status(400).json({ message: 'Parâmetro inválido' });
  } else {
    
      // Executa a consulta no banco de dados
      const response = await reserva.ReservaModel.find({ sala: sala_reserva }, (err, resultados) => {
        if (err) {
          console.error(err);
        } else {
          console.log(resultados);
        }
      });
      
      res.send(response.data);
    }
  };


exports.getOneReserva = async (req, res) => {   
  try {
    res.status(201).json(await reserva.ReservaModel.findById(req.params.id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createReserva = async (req, res) => {   
    try {
      console.log(req.body)
      res.status(201).json(await reserva.ReservaModel.create(req.body));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

exports.updateReserva = async (req, res) => {   
    try {;
      res.status(201).json(await reserva.ReservaModel.findByIdAndUpdate(req.params.id,req.body));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

exports.cancelaReserva = async (req, res) => {   
    try {;
      res.status(201).json(await reserva.ReservaModel.findByIdAndUpdate(req.params.id, { status: 'C' } ));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
/*
exports.disponivelReserva = async (req, res) => {   
    try {;
      res.status(201).json(await reserva.ReservaModel.findByIdAndUpdate(req.params.id, { status: 'C' } ));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

*/

//const result = await reserva.ReservaModel.find({barbeiro: "Maddison",horas: `${horario}`, unidade:"debitis", data: new Date('2023-06-12T06:49:10.786+00:00')})

exports.verificaHora = async (req,res)=>{

  const barbeiro = req.params.barbeiro
  const data = req.params.data

  try {
    
    const horas = [];
    
    for(var i = 9; i <= 21; i++){
      for(var j = 0; j<60; j+=30){
        i == 9 ? i = "09" : i = i;
        j == 0 ? m = "00" : m = j;

        let horario = `${i}:${m}`

        if(horario == '21:30'){
          break
        }else{
            //const result = await reserva.ReservaModel.find({horas: `${horario}`})
            const result = await reserva.ReservaModel.find({barbeiro: barbeiro,horas: `${horario}`, data: new Date(data), status: "R"})
            result.length > 0 ?  "" : horas.push(horario);
        }
      
      
      }
    }
    res.status(200).send(horas);

    
    
  } catch (error) {
    
  }
}


exports.verificaDisponibilidade = async (req,res)=>{
  try {
    res.status(201).json(await reserva.reservaModel.find({
      $gte: new Date(req.body.dia,req.body.hora),
      $lt: new Date(req.body.dia,req.body.hora)
    }))
  } catch (error) {
    
  }
}

exports.deleteReserva = async (req, res) => {
  try {
    res.status(201).json(await reserva.ReservaModel.findByIdAndDelete(req.params.id));

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};