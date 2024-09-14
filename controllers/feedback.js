const Feedback = require("../models/feedback");


const addFeedback = async (req, res) => {
    try {
      const { messageHeading, message, suggestion } = req.body;
  
      const feedback = new Feedback({
        messageHeading,
        message,
        suggestion,
      });
  
      await feedback.save();
      res.status(201).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to submit feedback' });
    }
  };
  


  const getAllFeedbacks = async (req, res) => {
    try {
      const feedbacks = await Feedback.find().sort({ submittedAt: -1 }); // Fetch all feedbacks from the database
      res.status(200).json(feedbacks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve feedbacks' });
    }
  };
  
  module.exports = { getAllFeedbacks ,addFeedback};
  