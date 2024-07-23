const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const auth = require('../middlewares/auth');  // Assuming you have authentication middleware

router.post('/request-loan', auth, loanController.requestLoan);

module.exports = router;
