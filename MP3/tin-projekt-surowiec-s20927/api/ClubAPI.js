const ClubRepository = require('../repository/sequelize/clubRepository');

exports.getClub = (req, res, next) => {
  ClubRepository.getClubs()
        .then(club => {
            res.status(200).json(club);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getClubById = (req, res, next) => {
    const clubId = req.params.clubId;
    
    ClubRepository.getClubById(clubId)
        .then(club => {
            if (!club) {
                res.status(404).json({
                    message: 'Club with id: ' + clubId + ' not found'
                })
            } else {
                res.status(200).json(club);
            }
        });
};

exports.createClub = (req, res, next) => {
  ClubRepository.createClub(req.body)
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

exports.updateClub = (req, res, next) => {
    const clubId = req.params.clubId;
    
    ClubRepository.updateClub(clubId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Club updated!', club: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteClub = (req, res, next) => {
    const clubId = req.params.clubId;
    
    ClubRepository.deleteClub(clubId)
        .then(result => {
            res.status(200).json({ message: 'Deleted club', club: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};