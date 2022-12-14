const CompetitorRepository = require('../repository/sequelize/competitorRepository');

exports.getCompetitor = (req, res, next) => {
  CompetitorRepository.getCompetitors()
        .then(competitor => {
            res.status(200).json(competitor);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCompetitorById = (req, res, next) => {
    const competitorId = req.params.competitorId;
    
    CompetitorRepository.getCompetitorById(competitorId)
        .then(competitor => {
            if (!competitor) {
                res.status(404).json({
                    message: 'Competitor with id: ' + competitorId + ' not found'
                })
            } else {
                res.status(200).json(competitor);
            }
        });
};

exports.createCompetitor = (req, res, next) => {
  CompetitorRepository.createCompetitor(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateCompetitor = (req, res, next) => {
    const competitorId = req.params.competitorId;
    
    CompetitorRepository.updateCompetitor(competitorId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Competitor updated!', competitor: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteCompetitor = (req, res, next) => {
    const competitorId = req.params.competitorId;
    
    CompetitorRepository.deleteCompetitor(competitorId)
        .then(result => {
            res.status(200).json({ message: 'Deleted competitor', competitor: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};