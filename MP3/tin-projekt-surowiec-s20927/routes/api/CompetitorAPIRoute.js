const express = require('express');
const router = express.Router();

const competitorApiController = require('../../api/CompetitorAPI');

router.get('/', competitorApiController.getCompetitor);
router.get('/:competitorId', competitorApiController.getCompetitorById);
router.post('/', competitorApiController.createCompetitor);
router.put('/:competitorId', competitorApiController.updateCompetitor);
router.delete('/:competitorId', competitorApiController.deleteCompetitor);

module.exports = router;