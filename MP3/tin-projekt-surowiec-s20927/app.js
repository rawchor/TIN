var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
        console.log(err);
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// languages
const i18n = require('i18n');
const { permitAuthenticatedCompetitor } = require('./util/authUtils');
i18n.configure({
   locales: ['pl', 'en'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik 
   directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
   objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
   cookie: 'acme-hr-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o języku aktualnie wybranym przez użytkownika
});
app.use(i18n.init); //inicjalizacja i połączenie do kontekstu aplikacji

app.use(cookieParser('secret'));

//logged in
// app.use((req, res, next) => {
//     const loggedCompetitor = req.session.loggedCompetitor;
//     console.log(loggedCompetitor);
//     console.log(req.session.loggedCompetitor);
//     res.locals.loggedCompetitor = { email: 'ultimategingermaster@gmail.com', password: '12345'  };  

//     res.locals.loggedCompetitor = loggedCompetitor;
//     if(!res.locals.loginError) {
//         res.locals.loginError = undefined;
//     }
//     next();
// });

const competitorRouter = require('./routes/competitorRoute');
const clubRouter = require('./routes/clubRoute');
const membershipRouter = require('./routes/membershipRoute');

const competitorApiRouter = require('./routes/api/CompetitorAPIRoute');
const clubApiRouter = require('./routes/api/ClubAPIRoute');
const membershipApiRouter = require('./routes/api/MembershipAPIRoute');

// logowanie
const session = require('express-session');

app.use(session({
    secret: 'mu_secret_password',
    resave: false
}));

//app.use('/competitor', authUtils.permitAuthenticatedCompetitor, competitorRouter);

// lang

app.use((req, res, next) => {
    if(!res.locals.lang) {
        const currentLang = req.cookies['acme-hr-lang'];
        res.locals.lang = currentLang;
    }
    next();
});

app.use('/', indexRouter);
app.use('/competitor', competitorRouter);
app.use('/club', clubRouter);
app.use('/membership', membershipRouter);

app.use('/api/competitors', competitorApiRouter);
app.use('/api/clubs', clubApiRouter);
app.use('/api/memberships', membershipApiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
