const Loan = require('../models/loan');
const Contribution = require('../models/contribution');
const User = require('../models/User');

exports.approveLoan = async (req, res) => {
  try {
    const { loanId } = req.params;

    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    loan.status = 'approved';
    loan.updatedAt = new Date();
    await loan.save();

    res.status(200).json({ message: 'Loan approved successfully', loan });
  } catch (error) {
    res.status(500).json({ message: 'Error approving loan', error: error.message });
  }
};

exports.getUserSummary = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const contributions = await Contribution.find({ userId });
    const totalContributions = contributions.reduce((acc, contribution) => acc + contribution.amount, 0);

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        totalContributions
      },
      contributions
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user summary', error: error.message });
  }
};
