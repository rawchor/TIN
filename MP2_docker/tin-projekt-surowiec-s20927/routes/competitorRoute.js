const express = require('express');
const router = express.Router();

const competitorController = require('../controllers/competitorController');

router.get('/', competitorController.showCompetitorList);
router.get('/add', competitorController.showCompetitorForm);
router.get('/details/:competitorId', competitorController.showCompetitorDetails);

module.exports = router;