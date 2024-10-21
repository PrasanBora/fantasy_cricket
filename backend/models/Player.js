const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  team: String,
  role: String,
  points: Number,
});

module.exports = mongoose.model('Player', playerSchema);
