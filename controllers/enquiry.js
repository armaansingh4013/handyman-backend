const Enquiry = require('../models/enquiry');

// Save a new enquiry
const saveEnquiry = async (req, res) => {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }
  
    try {
      const enquiry = new Enquiry(req.body);
      await enquiry.save();
      res.status(201).json({ message: 'Enquiry saved successfully!' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

// Get the count of enquiries
exports.countEnquiries = async (req, res) => {
  try {
    const count = await Enquiry.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all enquiries
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }); // Sort by latest first
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single enquiry by ID
exports.getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    res.status(200).json(enquiry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an enquiry
exports.updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    res.status(200).json({ message: 'Enquiry updated successfully', enquiry });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
   saveEnquiry,getAllEnquiries
}