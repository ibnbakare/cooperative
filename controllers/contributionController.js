const Contribution = require('../models/contribution');

exports.addContribution = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user._id; // Extract userId from the authenticated user

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const contribution = new Contribution({
      userId,
      amount,
      date: new Date()
    });

    await contribution.save();

    res.status(201).json({ message: 'Contribution added successfully', contribution });
  } catch (error) {
    res.status(500).json({ message: 'Error adding contribution', error: error.message });
  }
};
