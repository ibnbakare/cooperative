const Loan = require('../models/loan');
const Contribution = require('../models/contribution');

exports.requestLoan = async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const contributions = await Contribution.find({ userId });
    const totalContributions = contributions.reduce((sum, contribution) => sum + contribution.amount, 0);

    if (totalContributions < amount * 0.5) {
      return res.status(400).json({ message: 'Insufficient contributions to request this loan amount' });
    }

    const loan = new Loan({ userId, amount });
    await loan.save();

    res.status(201).json({ message: 'Loan requested successfully', loan });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting loan', error });
  }
};
