const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Protected route to get user profile
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;
