const mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
    recurso: { type: String, required: true },
    user: { type: String, required: true },
    text: String,
    data: Number,
  });

module.exports = mongoose.model('Comment', recursoSchema)