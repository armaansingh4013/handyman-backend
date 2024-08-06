const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const WorkAreaSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  image: {
    type: String,
    required: true,
  },
  // Additional fields can be added here
});

// Create and export the model
const WorkArea = mongoose.model('WorkArea', WorkAreaSchema);
module.exports = WorkArea;
