var express = require('express');
var router = express.Router();
var qs = require('qs');
var debug = require('debug')('nodejs_chat:chat');

/* GET chat page. */
router.get('/', function(req, res, next) {
  debug('Session objetc: ', req.session)
  if (req.session == null || req.session.passport.user == null){
    debug('Redirecting to login');
    var login_url = '/auth/login?' + qs.stringify(req.query);
    res.redirect(login_url);
  } else{
    debug('User is logged-in, continue');
    res.render('chat');
  }
});

module.exports = router;
