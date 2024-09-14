const Category = require("../models/category");
const Services = require("../models/services");
const WorkArea = require("../models/workarea");
const deleteImages = require('../helper/deleteImage');
const path = require('path');

// Create a new service (Create)
const createService = async (req, res) => {
  try {
    // Assuming images are uploaded with the key 'images'
    const images = req.files.map((file) => file.path.replace(/\\/g, '/'));

    // Create a new service
    const newService = new Services({
      ...req.body,
      images, // Save image paths in the images array
    });

    // Save the service to the database
    await newService.save();

    // Fetch the saved service and populate categoryId and workAreaId
    const populatedService = await Services.findById(newService._id)
      .populate('categoryId')   // Populate categoryId field
      .populate('workAreaId');  // Populate workAreaId field

    res.status(201).json(populatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Get all services with only images, name, and description
const getServicesSummary = async (req, res) => {
  try {
    const services = await Services.find({}, 'name description images');
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get services by category name with only name and first image
const getServiceByCategory = async (req, res) => {
  try {
    const categoryName = req.query.categoryName;
    
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const services = await Services.find({ categoryId: category._id }, 'name images');
    const servicesSummary = services.map(service => ({
      _id:service._id,
      name: service.name,
      image: service.images.length > 0 ? service.images[0] : null,
    }));
    
    res.status(200).json(servicesSummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get services by work area name with only name and first image
const getServiceByWorkarea = async (req, res) => {
  try {
    const workAreaName = req.query.workAreaName;
    const workArea = await WorkArea.findOne({ name: workAreaName });
    
    if (!workArea) {
      return res.status(404).json({ message: 'Work Area not found' });
    }

    const services = await Services.find({ workAreaId: workArea._id }, 'name images');
    const servicesSummary = services.map(service => ({
      _id: service._id,
      name: service.name,
      image: service.images.length > 0 ? service.images[0] : null,
    }));

    res.status(200).json(servicesSummary);
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
//get services
const getServices = async (req, res) => {
  try {
    const service = await Services.find().populate('categoryId workAreaId');
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update a service (Update)

const updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;

    // Get the existing service with images
    const existingService = await Services.findById(serviceId);
    if (!existingService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Parse existing images (URLs) from the request
    const existingImagesFromClient = req.body.existingImages
      ? JSON.parse(req.body.existingImages)
      : [];

    // Handle new uploaded images
    const newImages = req.files.map((file) => file.path.replace(/\\/g, '/'));

    // Combine new images with existing ones from the client
    const allImages = [...existingImagesFromClient, ...newImages];

    // Detect images to be deleted (i.e., those in the database but not in the updated list)
    const imagesToDelete = existingService.images.filter(
      (image) => !existingImagesFromClient.includes(image)
    );

    // Call the deleteImages function to remove the images from the folder
    deleteImages(imagesToDelete);

    // Update the service with new data
    const updatedService = await Services.findByIdAndUpdate(
      serviceId,
      {
        ...req.body,
        images: allImages, // Save the new list of images
      },
      { new: true, runValidators: true }
    )
      .populate('categoryId')   // Populate categoryId field
      .populate('workAreaId');   // Populate workAreaId field

    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




// Delete a service (Delete)
const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;

    // Find the service by ID and get the images before deletion
    const serviceToDelete = await Services.findById(serviceId);

    if (!serviceToDelete) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Get the images from the service to be deleted
    const imagesToDelete = serviceToDelete.images;

    // Delete the service from the database
    await Services.findByIdAndDelete(serviceId);

    // Call the deleteImages function to remove the images from the folder
    deleteImages(imagesToDelete);

    res.status(200).json({ message: 'Service and associated images deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Export the functions
module.exports = {
  createService,
  getServices,
  getServicesSummary,  // New route to get only images, name, and description
  getServiceByCategory,
  getServiceByCategory,  // New route to get only name and first image for category
  getServiceByWorkarea,
  getServiceByWorkarea,  // New route to get only name and first image for work area
  getService,
  updateService,
  deleteService,
};
