
const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/admin');
const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/make-admin/:userId', auth, adminAuth, userController.makeAdmin);

// Protected route to get user profile
router.get('/profile', auth, userController.getProfile);

router.get('/:userId/contributions-summary', auth,adminAuth, userController.getUserContributionsSummary);

module.exports = router;
