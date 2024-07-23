const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

// Initialize the app
const app = express();

// Middleware
app.use(cors());               // Enable Cross-Origin Resource Sharing
app.use(helmet());             // Enhance security by setting various HTTP headers
app.use(bodyParser.json());    // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan('combined'));   // HTTP request logger

require('dotenv').config();


const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Import routes
const contributionRoutes = require('./routes/contributionRoutes');
const loanRoutes = require('./routes/loanRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/api/contributions', contributionRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);
app.use("/",()=>console.log("Starting"))
// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
