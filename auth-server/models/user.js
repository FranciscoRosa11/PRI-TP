const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username: String,
    nome: String,
    email: String,
    filiacao: String,
    nivel: String,
    dataRegisto: String,
    dataUltimoAcesso: String,
    password: String
  });

module.exports = mongoose.model('User', userSchema)