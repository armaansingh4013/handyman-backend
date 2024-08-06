const Category = require("../models/category");
const Services = require("../models/services");
const WorkArea = require("../models/workarea");
const path = require('path');

// Create a new service (Create)
const createService = async (req, res) => {
  try {
    // Assuming images are uploaded with the key 'images'
    const images = req.files.map((file) => file.path.replace(/\\/g, '/'));

    const newService = new Services({
      ...req.body,
      images, // Save image paths in the images array
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all services (Read)
const getServices = async (req, res) => {
  try {
    const services = await Services.find().populate('categoryId workAreaId');
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get services by category name
const getServiceByCategory = async (req, res) => {
  try {
    const categoryName = req.query.categoryName;
    console.log(req.body);
    
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const services = await Services.find({ categoryId: category._id }).populate('categoryId workAreaId');
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get services by work area name
const getServiceByWorkarea = async (req, res) => {
  try {
    const workAreaName = req.query.workAreaName;
    const workArea = await WorkArea.findOne({ name: workAreaName });
    console.log(workArea);
    
    if (!workArea) {
      return res.status(404).json({ message: 'Work Area not found' });
    }

    const services = await Services.find({ workAreaId: workArea._id }).populate('categoryId workAreaId');
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single service by ID (Read)
const getService = async (req, res) => {
  try {
    const service = await Services.findById(req.query.id).populate('categoryId workAreaId');
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export the functions
module.exports = {
  createService,
  getServices,
  getServiceByCategory,
  getServiceByWorkarea,
  getService,
};
