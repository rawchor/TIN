const express = require('express');
const router = express.Router();

const membershipController = require('../controllers/membershipController');

// router.get('/', membershipController.showMembershipList);
// router.get('/add', membershipController.showMembershipForm);
// router.get('/details/:memberId', membershipController.showMembershipDetails);

router.get('/', membershipController.showMembershipList);
router.get('/add', membershipController.showAddMembershipForm);
router.get('/edit/:membershipId', membershipController.showEditMembershipForm);
router.get('/details/:membershipId', membershipController.showMembershipDetails);

router.post('/add', membershipController.addMembership); 
router.post('/edit', membershipController.updateMembership);
router.get('/delete/:membershipId', membershipController.deleteMembership);

module.exports = router;