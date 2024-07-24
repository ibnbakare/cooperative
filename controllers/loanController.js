const Loan = require('../models/loan');
const Contribution = require('../models/contribution');
const User = require('../models/User');

exports.requestLoan = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate total contributions
    const contributions = await Contribution.find({ userId });
    const totalContributed = contributions.reduce((total, contribution) => total + contribution.amount, 0);

    // Calculate total repaid amount for previous loans
    const loans = await Loan.find({ userId, repaid: false });
    const totalLoanBalance = loans.reduce((total, loan) => total + (loan.amount - loan.repaidAmount), 0);

    // Check if the user has contributed at least 50% of the requested loan amount
    const requiredContribution = amount / 2;
    if (totalContributed < requiredContribution) {
      return res.status(400).json({ message: 'You must have contributed at least 50% of the requested loan amount' });
    }

    // Check if all previous loans are repaid
    if (totalLoanBalance > 0) {
      return res.status(400).json({ message: 'All previous loans must be fully repaid before requesting a new loan' });
    }

    // Create the new loan with status "Pending"
    const loan = new Loan({ userId, amount, status: 'Pending', repaid: false });
    await loan.save();

    res.status(201).json({ message: 'Loan request submitted and pending approval', loan });
  } catch (error) {
    res.status(500).json({ message: 'Error processing loan request', error: error.message });
  }
};
