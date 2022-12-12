const express = require('express');
const router = express.Router();

const clubController = require('../controllers/clubController');

router.get('/', clubController.showClubList);
router.get('/add', clubController.showClubForm);
router.get('/details/:clubId', clubController.showClubDetails);

module.exports = router;