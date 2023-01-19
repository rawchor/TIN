const EmployeeRepository = require('../repository/sequelize/CompetitorRepository');
const authUtil = require("../util/authUtils");


exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    CompetitorRepository.findByEmail(email)
        .then(comperitor => {
            if(!comperitor) {
                res.render('index', {
                    navLocation: '',
                    info: false,
                    pageTitle: 'PZŻ Membership',
                    loginError: "Wrong email or password"
                })
            } else if(authUtil.comparePasswords(password, comperitor.password) === true)  {
                req.session.loggedUser = comperitor;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    info: false,
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
    req.session.loggedUser = undefined;
    res.redirect('/');
}

exports.registerForm = (req, res, next) => {
    res.render('addUser', {
        comperitor: {},
        pageTitle: 'New Competitor',
        formMode: 'createNew',
        btnLabel: 'Add Competitor',
        formAction: '/register',
        navLocation: 'registraction',
        validationErrors: {}
    })
}

exports.register = (req, res, next) => {
    const comperitor = {...req.body};
    EmployeeRepository.createKlient(comperitor)
        .then(result => {
            res.render('index', {
                info: true,
                infoColor: 'green',
                infoContents: 'Registered! Please logg in',
                pageTitle: 'PZŻ Membership',
                navLocation: 'main'
            })
        })
        .catch(err => {
            console.log(err.errors)
            res.render('addCompetitor', {
                comperitor: comperitor,
                pageTitle: 'New competitor',
                formMode: 'createNew',
                btnLabel: 'Add competitor',
                formAction: '/register',
                navLocation: 'registration',
                validationErrors: err.errors
            })
        });
};