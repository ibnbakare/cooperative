const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  contributions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contribution'
  }],
  loans: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Loan'
  }]
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);




// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   contributions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contribution' }],
//   loans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' }]
// });

// module.exports = mongoose.model('User', userSchema);
