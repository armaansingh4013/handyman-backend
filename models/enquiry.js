const mongoose = require('mongoose');

// Define the contact schema
const enquirySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'], // Email validation
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10,15}$/, 'Phone number is invalid'], // Basic phone number validation
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
