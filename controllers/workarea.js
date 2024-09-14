// controllers/workAreaController.js
const WorkArea = require('../models/workarea');
const path = require('path');
const {formatName} = require("../helper/formattingName")
const deleteImage = require('../helper/deleteImage'); 

// Create a new work area (Create)
const createWorkArea = async (req, res) => {
  // console.log('Uploaded file:', req.file); // Debugging statement

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const formattedName = formatName(req.body.name)
    const newWorkArea = new WorkArea({
      name: formattedName,
      image: req.file.path.replace(/\\/g, '/'), // Path to the uploaded file
    });
    await newWorkArea.save();
    res.status(201).json(newWorkArea);
  } catch (error) {
    console.error('Error:', error); // Debugging statement
    res.status(400).json({ message: error.message });
  }
};

// Get all work areas (Read)
const getWorkAreas = async (req, res) => {
  try {
    const workAreas = await WorkArea.find();
    res.status(200).json(workAreas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Get a single work area by ID (Read)
// exports.getWorkAreaById = async (req, res) => {
//   try {
//     const workArea = await WorkArea.findById(req.params.id);
//     if (!workArea) return res.status(404).json({ message: 'WorkArea not found' });
//     res.status(200).json(workArea);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a work area by ID (Update)

const updateWorkArea = async (req, res) => {
  try {
    const workAreaId = req.params.id;

    // Find the existing work area
    const existingWorkArea = await WorkArea.findById(workAreaId);
    if (!existingWorkArea) {
      return res.status(404).json({ message: 'WorkArea not found' });
    }

    // Prepare the update data
    const updatedWorkAreaData = { name: req.body.name };

    if (req.file) {
      // New image file provided
      updatedWorkAreaData.image = req.file.path.replace(/\\/g, '/');

      // Delete the old image if it exists
      if (existingWorkArea.image) {
        deleteImage([existingWorkArea.image]);
      }
    }

    // Update the work area
    const updatedWorkArea = await WorkArea.findByIdAndUpdate(
      workAreaId,
      updatedWorkAreaData,
      { new: true, runValidators: true }
    );

    if (!updatedWorkArea) {
      return res.status(404).json({ message: 'WorkArea not found' });
    }

    res.status(200).json(updatedWorkArea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// // Delete a work area by ID (Delete)

const deleteWorkArea = async (req, res) => {
  try {
    const workAreaId = req.params.id;

    // Find the existing work area to get the image path
    const workAreaToDelete = await WorkArea.findById(workAreaId);
    if (!workAreaToDelete) {
      return res.status(404).json({ message: 'WorkArea not found' });
    }

    // Get the image path if it exists
    if (workAreaToDelete.image) {
      deleteImage([workAreaToDelete.image]);
    }

    // Delete the work area from the database
    await WorkArea.findByIdAndDelete(workAreaId);

    res.status(200).json({ message: 'WorkArea and associated image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports={
  createWorkArea,getWorkAreas,deleteWorkArea,updateWorkArea
}