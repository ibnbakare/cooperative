const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  date: { type: Date, default: Date.now },
  repaidAmount: { type: Number, default: 0 }, // Amount repaid so far
  repaid: { type: Boolean, default: false }  // Repayment status
});

module.exports = mongoose.model('Loan', loanSchema);

