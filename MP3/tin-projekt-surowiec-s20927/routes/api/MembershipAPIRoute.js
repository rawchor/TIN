const express = require('express');
const router = express.Router();

const membershipApiController = require('../../api/MembershipAPI');

router.get('/', membershipApiController.getMembership);
router.get('/:membershipId', membershipApiController.getMembershipById);
router.post('/', membershipApiController.createMembership);
router.put('/:membershipId', membershipApiController.updateMembership);
router.delete('/:membershipId', membershipApiController.deleteMembership);

module.exports = router;