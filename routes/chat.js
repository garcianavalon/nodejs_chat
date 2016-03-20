var express = require('express');
var router = express.Router();
var debug = require('debug')('nodejs_chat:chat');

/* GET chat page. */
router.get('/', function(req, res, next) {
  debug('Session objetc: ', req.session)
  if (req.session == null || req.session.user == null){
    debug('Redirecting to login');
    res.redirect('/auth/login');
  } else{
    debug('User is logged-in, continue');
    res.render('chat');
  }
});

module.exports = router;
