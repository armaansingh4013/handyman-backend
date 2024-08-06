const Category = require("../models/category");
const path = require('path');
const {formatName} = require('../helper/formattingName')
// Create a new category (Create)
const createaCategory =  async (req, res) => {
  try {
    
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
    const formattedName = formatName(req.body.name);
    const newCategory = new Category({
      name: formattedName,
      image: req.file.path.replace(/\\/g, '/'), 
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
  // Get all categories (Read)
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single category by ID (Read)
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category by ID (Update)
const updateCategory = async (req, res) => {
  try {
    const updatedCategoryData = {
      name: req.body.name,
    };
    if (req.file) {
      updatedCategoryData.image = req.file.path;
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updatedCategoryData,
      { new: true, runValidators: true }
    );
    if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a category by ID (Delete)
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  
module.exports ={
    createaCategory,getAllCategories
}