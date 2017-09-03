const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordsSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  image: { type: String, required: true },
  duration_ms: { type: Number, required: true },
  tempo: { type: Number, required: true }
});


module.exports = mongoose.model('Records', recordsSchema);
