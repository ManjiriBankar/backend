const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  members: [{ type: String }],
});

module.exports = mongoose.model('Team', teamSchema);