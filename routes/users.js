var express = require('express');
var router = express.Router();
var debug = require('debug')('nodejs_chat:users');

/* GET all connected users */
router.get('/', function(req, res, next) {
  res.json(req.app.locals.connected_users);
});

/* GET user state */
router.get('/:username', function(req, res, next) {
  var username = req.params.username;
  var status = 'offline';
  debug('username: ', username);
  debug('connected_users: ', req.app.locals.connected_users);
  if (req.app.locals.connected_users.hasOwnProperty(username)) {
    status = 'online';
  }
  res.json({status: status});
});

module.exports = router;
