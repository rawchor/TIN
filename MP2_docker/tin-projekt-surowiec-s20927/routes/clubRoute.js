const express = require('express');
const router = express.Router();

const clubController = require('../controllers/clubController');

router.get('/', clubController.showClubList);
router.get('/add', clubController.showAddClubForm);
router.get('/edit/:clubId', clubController.showEditClubForm);
router.get('/details/:clubId', clubController.showClubDetails);

router.post('/add', clubController.addClub); 
router.post('/edit', clubController.updateClub);
//router.get('/delete/:clubId', clubController.deleteClub);

module.exports = router;