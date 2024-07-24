const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User'); // adjust the path to your user model


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
  
    async function makeUserAdmin(userId) {
        try {
          const user = await User.findById(userId);
          if (!user) {
            console.log('User not found');
            return;
          }
          
          user.role = 'admin';
          await user.save();
      
          console.log('User role updated to admin');
        } catch (error) {
          console.error('Error updating user role:', error);
        } finally {
          mongoose.connection.close();
        }
      }
      
      makeUserAdmin('669fc34a711d0e915fa75e3e'); // replace with the actual user ID