exports.showClubList = (req, res, next) => {
  res.render('pages/club/club-list', { navLocation: 'club' });
}

exports.showClubForm = (req, res, next) => {
  res.render('pages/club/club-form', { navLocation: 'club' });
}

exports.showClubDetails = (req, res, next) => {
  res.render('pages/club/club-details', { navLocation: 'club' });
}