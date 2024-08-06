// controllers/workAreaController.js
const WorkArea = require('../models/workarea');
const path = require('path');
const {formatName} = require("../helper/formattingName")
// Create a new work area (Create)
const createWorkArea = async (req, res) => {
  console.log('Uploaded file:', req.file); // Debugging statement

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
// exports.updateWorkArea = async (req, res) => {
//   try {
//     const updatedWorkAreaData = {
//       name: req.body.name,
//     };
//     if (req.file) {
//       updatedWorkAreaData.image = req.file.path;
//     }
//     const updatedWorkArea = await WorkArea.findByIdAndUpdate(
//       req.params.id,
//       updatedWorkAreaData,
//       { new: true, runValidators: true }
//     );
//     if (!updatedWorkArea) return res.status(404).json({ message: 'WorkArea not found' });
//     res.status(200).json(updatedWorkArea);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete a work area by ID (Delete)
// exports.deleteWorkArea = async (req, res) => {
//   try {
//     const deletedWorkArea = await WorkArea.findByIdAndDelete(req.params.id);
//     if (!deletedWorkArea) return res.status(404).json({ message: 'WorkArea not found' });
//     res.status(200).json({ message: 'WorkArea deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports={
  createWorkArea,getWorkAreas
}