const { truncate } = require('lodash');
const mongoose = require('mongoose');

const stage_two_vp = new mongoose.Schema({
  status: {
    type: String,
    enum: ['incomplete', 'in review', 'declined', 'complete'],
    default: 'incomplete'
  },

  eye_test_result: {
    type: String,
    trim: true,
    default: ''
  },

  ecg_test_result: {
    type: String,
    trim: true,
    default: ''
  },

  urine_test_result: {
    type: String,
    trim: true,
    default: ''
  },

  hermatology_test_result: {
    type: String,
    trim: true,
    default: ''
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