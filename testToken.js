const jwt = require('jsonwebtoken');
require('dotenv').config();


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjlmZDIxMDdjYWEwZDU2ZDE0OTZkNDUiLCJpYXQiOjE3MjE3NjQ2NDAsImV4cCI6MTcyMTc2ODI0MH0.C39Y4F9i-zlDayqYeSIjK06H7sJZuLuIQeKywWu-BJE"
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('Decoded:', decoded);
} catch (error) {
  console.error('Invalid token:', error.message);
}
