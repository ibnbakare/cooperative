const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  contributions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contribution' }],
  loans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' }]
});

module.exports = mongoose.model('User', userSchema);
