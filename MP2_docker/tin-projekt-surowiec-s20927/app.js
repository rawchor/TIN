var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

const competitorRouter = require('./routes/competitorRoute');
const clubRouter = require('./routes/clubRoute');
const membershipRouter = require('./routes/membershipRoute');

const competitorApiRouter = require('./routes/api/CompetitorAPIRoute');
const clubApiRouter = require('./routes/api/ClubAPIRoute');
const membershipApiRouter = require('./routes/api/MembershipAPIRoute');

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
