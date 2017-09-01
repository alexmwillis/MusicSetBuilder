const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordsSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  length: { type: Number, required: true },
  tempo: { type: Number, required: true },
  vocals: { type: Boolean, required: true },
});


module.exports = mongoose.model('Records', recordsSchema);
