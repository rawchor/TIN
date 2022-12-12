exports.showCompetitorList = (req, res, next) => {
  res.render('pages/competitor/competitor-list', { navLocation: 'competitor' });
}

exports.showCompetitorForm = (req, res, next) => {
  res.render('pages/competitor/competitor-form', { navLocation: 'competitor' });
}

exports.showCompetitorDetails = (req, res, next) => {
  res.render('pages/competitor/competitor-details', { navLocation: 'competitor' });
}