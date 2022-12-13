exports.showMembershipList = (req, res, next) => {
  res.render('pages/membership/membership-list', { navLocation: 'membership' });
}

exports.showMembershipForm = (req, res, next) => {
  res.render('pages/membership/membership-form', { navLocation: 'membership' });
}

exports.showMembershipDetails = (req, res, next) => {
  res.render('pages/membership/membership-details', { navLocation: 'membership' });
}