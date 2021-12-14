const { truncate } = require('lodash');
const mongoose = require('mongoose');

const stage_two_vp = new mongoose.Schema({
  status: {
    type: String,
    enum: ['incomplete', 'review', 'completed'],
    default: 'incomplete'
  },

  eye_test_result: {
    type: String,
    trim: true
  },

  ecg_test_result: {
    type: String,
    trim: true
  },

  urine_test_result: {
    type: String,
    trim: true
  },

  hermatology_test_result: {
    type: String,
    trim: true
  },

  comments: [{
    type: String,
    trim: true
  }],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})


module.exports = mongoose.model('Stage_two_vp', stage_two_vp)