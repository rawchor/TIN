const CompetitorRepository = require('../repository/sequelize/competitorRepository');

exports.showCompetitorList = (req, res, next) => {
    CompetitorRepository.getCompetitors()
        .then(competitor => {
            res.render('pages/competitor/competitor-list', {
                competitors: competitor,
                navLocation: 'competitor'
            });
        });
}

exports.showAddCompetitorForm = (req, res, next) => {
    res.render('pages/competitor/competitor-form', {
        competitor: {},
        pageTitle: 'New competitor',
        formMode: 'createNew',
        btnLabel: 'Add competitor',
        formAction: '/competitor/add',
        navLocation: 'competitor'
  });
}

exports.showEditCompetitorForm = (req, res, next) => {
    const competitorId = req.params.competitorId;
    CompetitorRepository.getCompetitors()
        .then(competitor => {
            res.render('pages/competitor/competitor-form', {
                competitor: competitor,
                formMode: 'edit',
                btnLabel: 'Edit Competitor',
                formAction: '/competitor/edit',
                navLocation: 'competitor',
                validationErrors: 'competitor'
            });
        });
}

exports.showCompetitorDetails = (req, res, next) => {
  const competitorId = req.params.competitorId;
  CompetitorRepository.getCompetitors()
      .then(competitor => {
          res.render('pages/competitor/competitor-form', {
              competitor: competitor,
              formMode: 'showDetails',
              pageTitle: 'Competitor Details',
              formAction: '',
              navLocation: 'competitor'
          });
      });
}

exports.addCompetitor = (req, res, next) => {
  const competitorData = { ...req.body };
  
  CompetitorRepository.createCompetitor(competitorData)
      .then( result => {
          res.redirect('/competitor');
      })
      .catch(err => {
          res.render('pages/competitor/competitor-form', {
            competitor: competitorData,
              pageTitle: 'New Competitor',
              formMode: 'createNew',
              btnLabel: 'Add competitor',
              formAction: '/competitor/add',
              navLocation: 'competitor',
              validationErrors: err.errors
          })
      });
};

exports.updateCompetitor = (req, res, next) => {
  const competitorId = req.body._id;
  const competitorData = { ...req.body };
  let error;
  
  CompetitorRepository.updateCompetitor(competitorId, competitorData)
      .then(result => {
          res.redirect('/competitor');
      })
      .catch(err => {
          error = err;
          return CompetitorRepository.getCompetitorById(competitorId)
      })
      .then(competitor => {
          res.render('pages/competitor/competitor-form', {
              competitor: competitor,
              formMode: 'edit',
              pageTitle: 'Edit competitor',
              btnLabel: 'Edit competitor',
              formAction: '/competitor/edit',
              navLocation: 'competitor',
              validationErrors: error.errors
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