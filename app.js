var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');

require("./config/passport")(passport)
// mongoose 
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('connected,,'))
  .catch((err) => console.log(err));

// routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var classRouter = require('./routes/class');
var aboutRouter = require('./routes/about');
var parentLoginRouter = require('./routes/parentLogin');
var parentRegistrationRouter = require('./routes/parent-registration');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// express session 
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/class', classRouter);
app.use('/about', aboutRouter);
app.use('/parentLogin', parentLoginRouter);
app.use('/parent-registration', parentRegistrationRouter);

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// parse requests
app.use(bodyParser.urlencoded({
  extended: true
}));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;