const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  messageHeading: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  suggestion: {
    type: String,
    trim: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
