const Contribution = require('../models/contribution');
const User = require('../models/User');

exports.addContribution = async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const contribution = new Contribution({ userId, amount });
    await contribution.save();

    await User.findByIdAndUpdate(userId, {
      $push: { contributions: contribution._id }
    });

    res.status(201).json({ message: 'Contribution added successfully', contribution });
  } catch (error) {
    res.status(500).json({ message: 'Error adding contribution', error });
  }
};
