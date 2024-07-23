const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
   
    tlsAllowInvalidCertificates: true, // Add these options
    tlsAllowInvalidHostnames: true
  })
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch(err => {
      console.error('MongoDB connection error:', err.message);
    });
  
