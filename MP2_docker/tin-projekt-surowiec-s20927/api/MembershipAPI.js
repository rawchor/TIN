const MembershipRepository = require('../repository/sequelize/membershipRepository');

exports.getMembership = (req, res, next) => {
  MembershipRepository.getMemberships()
        .then(membership => {
            res.status(200).json(membership);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getMembershipById = (req, res, next) => {
    const membershipId = req.params.membershipId;
    
    MembershipRepository.getMembershipById(membershipId)
        .then(membership => {
            if (!membership) {
                res.status(404).json({
                    message: 'Membership with id: ' + membershipId + ' not found'
                })
            } else {
                res.status(200).json(membership);
            }
        });
};

exports.createMembership = (req, res, next) => {
  MembershipRepository.createMembership(req.body)
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

exports.updateMembership = (req, res, next) => {
    const membershipId = req.params.membershipId;
    
    MembershipRepository.updateMembership(membershipId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Membership updated!', membership: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteMembership = (req, res, next) => {
    const membershipId = req.params.membershipId;
    
    MembershipRepository.deleteMembership(membershipId)
        .then(result => {
            res.status(200).json({ message: 'Deleted membership', membership: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};