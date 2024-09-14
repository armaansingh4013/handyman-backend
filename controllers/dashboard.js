


// Example models (replace with your actual models)
const WorkArea = require('../models/workarea');
const Services = require("../models/services");
const Category = require("../models/category");
const Feedback = require("../models/feedback");
const Enquiry = require('../models/enquiry');

// Route to get dashboard stats
const dashboard = async (req, res) => {
  try {
    const totalWorkAreas = await WorkArea.countDocuments();
    const totalServices = await Category.countDocuments();
    const totalServiceItems = await Services.countDocuments();
    const totalReviews = await Feedback.countDocuments();
    const totalQueries = await Enquiry.countDocuments();
    
    // Queries in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const queriesLast30Days = await Enquiry.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

    res.json({
      totalWorkAreas,
      totalServices,
      totalServiceItems,
      totalReviews,
      totalQueries,
      queriesLast30Days
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};


module.exports = { dashboard};


