const express = require('express');
const router = express.Router();

const competitorController = require('../controllers/competitorController');

router.get('/', competitorController.showCompetitorList);
router.get('/add', competitorController.showAddCompetitorForm);
router.get('/edit/:competitorId', competitorController.showEditCompetitorForm);
router.get('/details/:competitorId', competitorController.showCompetitorDetails);

router.post('/add', competitorController.addCompetitor); 
router.post('/edit', competitorController.updateCompetitor);
router.get('/delete/:competitorId', competitorController.deleteCompetitor);

module.exports = router;