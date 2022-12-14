const express = require('express');
const router = express.Router();

const clubApiController = require('../../api/ClubAPI');

router.get('/', clubApiController.getClub);
router.get('/:clubId', clubApiController.getClubById);
router.post('/', clubApiController.createClub);
router.put('/:clubId', clubApiController.updateClub);
router.delete('/:clubId', clubApiController.deleteClub);

module.exports = router;