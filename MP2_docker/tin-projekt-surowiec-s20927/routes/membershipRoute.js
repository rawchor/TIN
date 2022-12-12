const express = require('express');
const router = express.Router();

const membershipController = require('../controllers/membershipController');

router.get('/', membershipController.showMembershipList);
router.get('/add', membershipController.showMembershipForm);
router.get('/details/:memberId', membershipController.showMembershipDetails);

module.exports = router;