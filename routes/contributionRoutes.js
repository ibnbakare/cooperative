const express = require('express');
const router = express.Router();
const contributionController = require('../controllers/contributionController');
const auth = require('../middlewares/auth');

router.post('/contribute', auth, contributionController.addContribution);

module.exports = router;
