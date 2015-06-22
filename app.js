var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var expressSession  = require("express-session");
var RedisStore      = require("connect-redis")(expressSession);
var conf            = require("./config");

// Routers load
var routes  = require('./routes/index');
var users   = require('./routes/users');
var session = require('./routes/session');
var blog    = require('./routes/blog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// TODO: Add favicon
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use expressSession with redis
app.use(expressSession({
  store: new RedisStore({
    host: conf.redis.host || '127.0.0.1',
    port: conf.redis.port || 6379,
    prefix: conf.redis.prefix || 'sessions'
  }),
  secret: "sdjfksj•#îœÓÓÓÓÓ—Ô∏‰app•¿ËÍÎ∫∫",
  cookie: { secure: false },
  resave: false,
  httpOnly: true,
  saveUninitialized: false,
  maxAge: conf.session.expireTime || 10000000
}));

app.use(function (req, res, next) {
  // Check if session set
  if (!req.session) {
    return next(new Error('oh no, NO SESSION')); // handle error
  }
  next(); // otherwise continue
});

// Get SubDomain
var request = [];
app.use(function(req, res, next) {
  var host = req.headers.host;
  req.subDomain =  host.split('.')[0];
  if (req.subDomain === host) {
    req.subDomain = false;
  }
  next();
});

app.use('/', blog);
app.use('/', routes);
app.use('/users', users);
app.use('/session', session);

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
