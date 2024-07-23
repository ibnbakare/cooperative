const Loan = require('../models/loan');
const Contribution = require('../models/contribution');

exports.requestLoan = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user._id;

    // Calculate the total contributions of the user
    const contributions = await Contribution.find({ userId });
    const totalContributions = contributions.reduce((acc, contribution) => acc + contribution.amount, 0);

    // Check if total contributions are at least 50% of the requested loan amount
    if (totalContributions < amount * 0.5) {
      return res.status(400).json({ message: 'You need to have saved at least 50% of the requested loan amount.' });
    }

    const loan = new Loan({
      userId,
      amount,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await loan.save();

    res.status(201).json({ message: 'Loan request submitted successfully', loan });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting loan', error: error.message });
  }
};
