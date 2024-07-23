const axios = require('axios');
const Contribution = require('../models/contribution');
const User = require('../models/User');

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// Initialize a payment
exports.initializePayment = async (req, res) => {
  const { email, amount } = req.body;

  const data = {
    email,
    amount: amount * 100 // Paystack requires the amount in kobo
  };

  try {
    const response = await axios.post('https://api.paystack.co/transaction/initialize', data, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json({ authorization_url: response.data.data.authorization_url });
  } catch (error) {
    res.status(500).json({ message: 'Payment initialization failed', error: error.message });
  }
};

// Verify a payment
exports.verifyPayment = async (req, res) => {
  const { reference, userId, amount } = req.query;

  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
      }
    });

    if (response.data.data.status === 'success') {
      const contribution = new Contribution({ userId, amount });
      await contribution.save();

      await User.findByIdAndUpdate(userId, {
        $push: { contributions: contribution._id }
      });

      res.status(200).json({ message: 'Payment verified and contribution added successfully', contribution });
    } else {
      res.status(400).json({ message: 'Payment verification failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Payment verification failed', error: error.message });
  }
};
