var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieSession = require('cookie-session')
var debug = require('debug')('nodejs_chat:app');

var swig = require('swig');

var app = express();

// view engine setup
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport middleware
app.use(cookieSession({
  secret: 'TODO'
}));
app.use(passport.initialize());
app.use(passport.session());
// add chat_with to session cookie
app.use(function(req, res, next){
  if (req.session != null){
    // initialize conversations array if empty
    if (req.session.conversations == null) {
      req.session.conversations = [];
    };
    // add user
    var new_user = req.query.chat_with
    if (new_user != null && !(req.session.conversations.includes(new_user))) {
      debug('Adding new user to conversations: ', new_user);
      req.session.conversations.push(new_user);
    };
  }
  next();
});
// add session object as context in templates
app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});



// routes
var chat = require('./routes/chat');
var auth = require('./routes/auth')(passport);

app.use('/', chat);
app.use('/auth', auth)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
