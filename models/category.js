const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Category schema (similar structure can be used for WorkArea)
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;