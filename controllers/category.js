const Category = require("../models/category");
const path = require('path');
const {formatName} = require('../helper/formattingName')
const deleteImage = require('../helper/deleteImage'); 
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
    const categoryId = req.params.id;
    const { name } = req.body;

    // Find the existing category
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Prepare the update data
    const updatedCategoryData = { name };
    if (req.file) {
      // New image file provided
      updatedCategoryData.image = req.file.path.replace(/\\/g, '/');

      // Delete the old image if it exists
      if (existingCategory.image) {
        deleteImage([existingCategory.image]);
      }
    }

    // Update the category
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updatedCategoryData,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete a category by ID (Delete)

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find the existing category to get the image path
    const categoryToDelete = await Category.findById(categoryId);
    if (!categoryToDelete) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Get the image path if it exists
    if (categoryToDelete.image) {
      deleteImage([categoryToDelete.image]);
    }

    // Delete the category from the database
    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({ message: 'Category and associated image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  
module.exports ={
    createaCategory,getAllCategories,deleteCategory,updateCategory
}