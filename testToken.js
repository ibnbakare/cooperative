const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjlmYzM0YTcxMWQwZTkxNWZhNzVlM2UiLCJpYXQiOjE3MjE3NDgxNzAsImV4cCI6MTcyMTc1MTc3MH0.0EEymWewQD_0fD60d0fGs4ubeBzXeQ-wt49xAwyc2ik';

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('Decoded:', decoded);
} catch (error) {
  console.error('Invalid token:', error.message);
}
