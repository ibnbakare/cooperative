const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const auth = require('../middlewares/auth');

router.post('/request-loan', auth, loanController.requestLoan);

module.exports = router;
