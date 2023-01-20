const CompetitorRepository = require('../repository/sequelize/CompetitorRepository');
const authUtil = require("../util/authUtils");


exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    CompetitorRepository.findByEmail(email)
        .then(competitor => {
            if(!competitor) {
                res.render('index', {
                    navLocation: '',
                    announcement: false,
                    pageTitle: 'PZŻ Membership',
                    loginError: "Wrong email or password"
                })
            } else if(authUtil.comparePasswords(password, competitor.password) === true) {
                req.session.loggedCompetitor = competitor;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    announcement: false,
                    pageTitle: 'PZŻ Membership',
                    loginError: "Wrong email or password"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

}

exports.logout = (req, res, next) => {
    req.session.loggedCompetitor = undefined;
    res.redirect('/');
}