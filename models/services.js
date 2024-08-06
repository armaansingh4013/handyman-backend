const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {
      type: String,
      required: true,
    },
    isMain: {
      type: Boolean,
      default: false,
    },
  });
  

const servicesSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique:true
    },
    description: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Reference to the Category model
      required: true,
    },
    workAreaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorkArea', // Reference to the WorkArea model
      required: true,
    },
    images: [String]
},
{
    timestamps: true
})

module.exports = mongoose.model('Services', servicesSchema);