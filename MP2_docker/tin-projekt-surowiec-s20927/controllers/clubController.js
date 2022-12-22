const ClubRepository = require('../repository/sequelize/clubRepository');

exports.showClubList = (req, res, next) => {
    ClubRepository.getClubs()
        .then(club => {
            res.render('pages/club/club-list', {
                clubs: club,
                navLocation: 'club'
            });
        });
}

exports.showAddClubForm = (req, res, next) => {
    res.render('pages/club/club-form', {
        club: {},
        pageTitle: 'New Club',
        formMode: 'createNew',
        btnLabel: 'Add club',
        formAction: '/club/add',
        navLocation: 'club'
  });
}

exports.showEditClubForm = (req, res, next) => {
    const clubId = req.params.clubId;
    ClubRepository.getClubById(clubId)
        .then(club => {
            res.render('pages/club/club-form', {
                club: club,
                formMode: 'edit',
                btnLabel: 'Edit club',
                pageTitle: 'Club Details',
                formAction: '/club/edit',
                navLocation: 'club',
                validationErrors: 'club'
            });
        });
}

exports.showClubDetails = (req, res, next) => {
  const clubId = req.params.clubId;
  ClubRepository.getClubById(clubId)
      .then(club => {
          res.render('pages/club/club-form', {
              club: club,
              formMode: 'showDetails',
              pageTitle: 'Club Details',
              formAction: '',
              navLocation: 'club'
          });
      });
}

exports.addClub = (req, res, next) => {
  const clubData = { ...req.body };
  
  ClubRepository.createClub(clubData)
      .then( result => {
          res.redirect('/club');
      })
      .catch(err => {
          res.render('pages/club/club-form', {
              club: clubData,
              pageTitle: 'New Club',
              formMode: 'createNew',
              btnLabel: 'Add club',
              formAction: '/club/add',
              navLocation: 'club',
              validationErrors: 'club'
          })
      });
};

exports.updateClub = (req, res, next) => {
  const clubId = req.body._id;
  const clubData = { ...req.body };
  //let error;
  
  ClubRepository.updateClub(clubId, clubData)
      .then(result => {
          res.redirect('/clubs');
      })

    //   .catch(err => {
    //       error = err;
    //       return ClubRepository.getClubById(clubId)
    //   })
    
      .then(club => {
          res.render('pages/club/club-form', {
              club: club,
              formMode: 'edit',
              pageTitle: 'Edit Club',
              btnLabel: 'Edit club',
              formAction: '/club/edit',
              navLocation: 'club',
              //validationErrors: 'club',
              validationErrors: []
          })
      });
};

exports.deleteCompetitor = (req, res, next) => {
  const competitorId = req.params.competitorId;
  const competitorData = { ...req.body };
  
  CompetitorRepository.deleteCcompetitor(competitorId)
      .then( () => {
          res.redirect('/competitor');
      })
      .catch(err => {
          res.render('pages/competitor/competitor-form', {
            competitor: competitorData,
              formMode: 'delete',
              pageTitle: 'Delete competitor',
              btnLabel: 'Delete competitor',
              formAction: '/competitor/delete',
              navLocation: 'competitor',
              validationErrors: []
          })
      });
};
// exports.showCompetitorList = (req, res, next) => {
//   res.render('pages/competitor/competitor-list', { navLocation: 'competitor' });
// }

// exports.showCompetitorForm = (req, res, next) => {
//   res.render('pages/competitor/competitor-form', { navLocation: 'competitor' });
// }

// exports.showCompetitorDetails = (req, res, next) => {
//   res.render('pages/competitor/competitor-details', { navLocation: 'competitor' });
// }