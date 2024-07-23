const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middlewares/auth');

router.post('/initialize', auth, paymentController.initializePayment);
router.get('/verify', auth, paymentController.verifyPayment);

module.exports = router;
