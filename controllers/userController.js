const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Contribution = require('../models/contribution');


// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
    console.log(req.body)
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log("check if exits")
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    console.log("saving user")
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'User logged in successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};


// Get user profile
exports.getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
  };



exports.makeAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.role = 'admin';
    await user.save();

    res.status(200).json({ message: 'User role updated to admin', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error: error.message });
  }
};


exports.getUserContributionsSummary = async (req, res) => {
    try {
      const userId = req.params.userId;
      const contributions = await Contribution.find({ userId });
  
      const totalContributed = contributions.reduce((total, contribution) => total + contribution.amount, 0);
  
      res.status(200).json({ userId, totalContributed, contributions });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching contributions summary', error: error.message });
    }
  };
  