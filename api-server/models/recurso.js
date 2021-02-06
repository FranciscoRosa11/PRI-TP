const mongoose = require('mongoose')

var recursoSchema = new mongoose.Schema({
    tipo: { type: String, required: true },
    titulo: String,
    dataRegisto: String,
    visibilidade: Number,
    dataCriacao: String,
    autor: String
  });

module.exports = mongoose.model('recurso', recursoSchema)