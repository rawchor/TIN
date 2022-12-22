const MembershipRepository = require('../repository/sequelize/membershipRepository');
const CompetitorRepository = require('../repository/sequelize/competitorRepository');
const ClubRepository = require('../repository/sequelize/clubRepository');


exports.showMembershipList = (req, res, next) => {
    MembershipRepository.getMemberships()
        .then(membership => {
            res.render('pages/membership/membership-list', {
                memberships: membership,
                pageTitle: 'Membership List',
                navLocation: 'membership'
            });
        });
}

exports.showAddMembershipForm = (req, res, next) => {
    let allCompetitors, allClubs;
    MembershipRepository.getMemberships()
        .then(memberships => {
            allMemberships = memberships;
            return CompetitorRepository.getCompetitors();
        })
        .then(competitors => {
            allCompetitors = competitors;
            return ClubRepository.getClubs();
        })
        .then(clubs => {
            allClubs = clubs;
            res.render('pages/membership/membership-form', {
                membership: {},
                formMode: 'createNew',
                allCompetitors: allCompetitors,
                allClubs: allClubs,
                pageTitle: 'New membership',
                btnLabel: 'Add membership',
                formAction: '/membership/add',
                navLocation: 'membership'
            });
        });
}

// exports.showAddMembershipForm = (req, res, next) => {
//     res.render('pages/membership/membership-form', {
//       membership: {},
//         pageTitle: 'New membership',
//         formMode: 'createNew',
//         btnLabel: 'Add membership',
//         formAction: '/membership/add',
//         navLocation: 'membership'
//   });
// }

exports.showEditMembershipForm = (req, res, next) => {
    const membershipId = req.params.membershipId;
    let allCustomers, allBooks, allRents;
    
    MembershipRepository.getMembership()
        .then(membership => {
            res.render('pages/membership/membership-form', {
                membership: membership,
                formMode: 'edit',
                btnLabel: 'Edit membership',
                formAction: '/membership/edit',
                navLocation: 'membership',
                validationErrors: 'membership'
            });
        });
}

exports.showMembershipDetails = (req, res, next) => {
    const membershipId = req.params.membershipId;
    MembershipRepository.getMembership()
        .then(membership => {
          res.render('pages/membership/membership-form', {
              membership: membership,
              formMode: 'showDetails',
              pageTitle: 'Membership Details',
              formAction: '',
              navLocation: 'membership'
          });
      });
}

exports.addMembership = (req, res, next) => {
    let allCustomers, allBooks, error;
    const membershipData = { ...req.body };
  
    MembershipRepository.createMembership(membershipData)
        .then(result => {
            res.redirect('/membership');
        })
        .catch(err => {
            error = err;
            return CompetitorRepository.getCompetitors();   
        })
        .then(competitors => {
            allCompetitors= competitors;
            return ClubRepository.getClubs()
        })
        .then(clubs => {
            allClubs = clubs;
            res.render('pages/membership/membership-form', {
                membership: {},
                allCompetitors: allCompetitors,
                allClubs: allClubs,
                formMode: 'createNew',
                pageTitle: 'Add Membership',
                btnLabel: 'Add Membership',
                formAction: '/membership/add',
                navLocation: 'membership',
                validationErrors: error.errors
            });
        });
//         .catch(err => {
//             res.render('pages/membership/membership-form', {
//                 membership: membershipData,
//                 pageTitle: 'New membership',
//                 formMode: 'createNew',
//                 btnLabel: 'Add membership',
//                 formAction: '/membership/add',
//                 navLocation: 'membership',
//                 validationErrors: err.errors
//             })
//         });
};

exports.updateMembership = (req, res, next) => {
    const membershipId = req.body._id;
    const membershipData = { ...req.body };
    let error;
    
    MembershipRepository.updateMembership(membershipId, membershipData)
        .then(result => {
            res.redirect('/membership');
        })
        .catch(err => {
            error = err;
            return MembershipRepository.getMembershipById(membershipId)
        })
        .then(membership => {
            res.render('pages/membership/membership-form', {
                membership: membership,
                formMode: 'edit',
                pageTitle: 'Edit membership',
                btnLabel: 'Edit membership',
                formAction: '/membership/edit',
                navLocation: 'membership',
                validationErrors: error.errors
            })
        });
};

exports.deleteMembership = (req, res, next) => {
    const membershipId = req.params.membershipId;
    const membershipData = { ...req.body };
    
    MembershipRepository.deleteMembership(membershipId)
        .then( () => {
            res.redirect('/membership');
        })
        .catch(err => {
            res.render('pages/membership/membership-form', {
                membership: membershipData,
                formMode: 'delete',
                pageTitle: 'Delete membership',
                btnLabel: 'Delete membership',
                formAction: '/membership/delete',
                navLocation: 'membership',
                validationErrors: []
            })
        });
};

// exports.showMembershipList = (req, res, next) => {
//   res.render('pages/membership/membership-list', { navLocation: 'membership' });
// }

// exports.showMembershipForm = (req, res, next) => {
//   res.render('pages/membership/membership-form', { navLocation: 'membership' });
// }

// exports.showMembershipDetails = (req, res, next) => {
//   res.render('pages/membership/membership-details', { navLocation: 'membership' });
// }