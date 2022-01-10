const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
  location: {
    type: String,
    trim: true
  },
  voice_note: {
    type: String,
    trim: true
  },
  issue: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});


module.exports = mongoose.model('Emergency', emergencySchema)