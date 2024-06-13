const Users = require('../models/usuario.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'segredo';
const { ClienteModel } = require('../models/clientes.js');


exports.CreateUser = async (req, res) => {
    try {
        
      var { email, nome, senha, role } = req.body;
         nsessao='0';

      email = email.toLowerCase();
      console.log("AOBA")
      console.log(email)
      const userEmail = await Users.UsuarioModel.findOne({email: email})
      if(userEmail){
        console.log("olha eu")
        res.status(401).send("Email já utilizado, digite outro.")
      }else{
        const telefone = await ClienteModel.findOne({tel: req.body.telefone})
      if(telefone){
        res.status(401).send("Numero de telefone já utilizado, digite outro")
      }else{
        const hashedPassword = await bcrypt.hash(senha, 10);

      const payload = {
        email,
        nome,
        senha: hashedPassword,
        role,
        nsessao
      };
  
      const newUser = new Users.UsuarioModel(payload);
      newUser.token = jwt.sign(payload, secretKey);
  
      await newUser.save();
  
      res.status(201).json(newUser._id);
    }
    }

    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    
  };
exports.ValidaUser = async (req, res) => {

  const senha = req.body.senha

    const UserBd =  await Users.UsuarioModel.findOne({email: req.body.email.toLowerCase()});
    if(!UserBd){
        res.status(401).send("Credenciais invalidas")
    }else{
      
    const passwordMatch = await bcrypt.compare(senha, UserBd.senha);
    if (!passwordMatch) {
      return res.status(401).send('Email ou senha inválidos.');
    }
        const token = UserBd.token;

        jwt.verify(token, secretKey, (err, decodedToken) => {
            if (err) {
              return res.status(401).json({ message: 'Invalid token' });
            } else {               
                    res.status(201).send(UserBd._id);
                
            }
          });    
    };
   
}

exports.ValidaUserDash = async (req, res) => {
  const senha = req.body.senha
  const UserBd =  await Users.UsuarioModel.findOne({email: req.body.email.toLowerCase(), role: { $in: ["admin", "funcionario"] } });
  if(!UserBd){
      res.status(401).send("Credenciais invalidas")
  }else{
    const passwordMatch = await bcrypt.compare(senha, UserBd.senha);
    if (!passwordMatch) {
      return res.status(401).send('Email ou senha inválidos.');
    }
      const token = UserBd.token;

      jwt.verify(token, secretKey, (err, decodedToken) => {
          if (err) {
            return res.status(401).json({ message: 'Invalid token' });
          } else {               
                  res.status(201).send(UserBd._id);
              
          }
        });    
  };
 
}

exports.UpdateUser = async (req, res) => {
    try {
      
      const userId = req.params.id; // Assuming you pass the user ID in the request parameters
  
      console.log(userId)
      // Find the user by ID 
      const user = await Users.UsuarioModel.findByIdAndUpdate(userId,req.body);
        console.log(user)
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
  
      
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  exports.deleteUser = async (req, res) => {
    try {
      res.status(201).json(await Users.UsuarioModel.findByIdAndDelete(req.params.id))
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  exports.getAllUsers = async (req, res) => {
    try {
      res.status(201).json(await Users.UsuarioModel.find())
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };