const express = require('express');
const { approveLoan, getUserSummary } = require('../controllers/adminController');
const adminAuth = require('../middlewares/admin');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/approve-loan/:loanId', auth, adminAuth, approveLoan);
router.get('/user-summary/:userId', auth, adminAuth, getUserSummary);

module.exports = router;
