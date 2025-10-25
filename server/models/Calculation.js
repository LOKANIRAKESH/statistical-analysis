const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
  distribution: {
    type: String,
    required: true,
    // UPDATED: Added 'descriptive', 'z-test', and 'regression' to the list
    enum: ['normal', 'binomial', 'poisson', 'exponential', 'uniform', 'descriptive', 'z-test', 'regression']
  },
  parameters: {
    type: Object,
    required: true
  },
  results: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Calculation', calculationSchema);