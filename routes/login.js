var express = require('express');
var router = express.Router();
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

// passport middleware
router.use(passport.initialize());
router.use(passport.session());

// user handling
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// NOTE(garcianavalon) change 'provider' with the provider of choice
// NOTE(garcianavalon) 10.0.2.2 is the host machine
passport.use('provider', new OAuth2Strategy({
    authorizationURL: 'http://localhost:7070/oauth/authorize',
    tokenURL: 'http://10.0.2.2:7070/oauth/token/',
    clientID: 'LNNiKVYWBNfl7F9FH5iA3gJOlakXYoKuHYCaABHD',
    clientSecret: 'bzlHgzPCsea0fG8HK3gsEfBV2wCz1bofvb6dWhhxuEedx7i02stqeMl1GcMwDx1f2OctKx7DlhkIQLlwQodb8WWBBadkm0InDfYKPvA6mZ9xVOiZa07fY9muawzfcXSn',
    callbackURL: 'http://localhost:3000/auth/provider/callback'
  },
  function(accessToken, refreshToken, profile, done) {
  	// NOTE(garcianavalon) don't store user info => no 'find-or-create'
  	// Simply populate a user object with the provided info
  	var user = {
  		'name': 'TODO',
  		'id': 'TODO'
  	}
    done(null, user);
  }
));

// Redirect the user to the OAuth 2.0 provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
router.get('/provider', passport.authenticate('provider'));

// The OAuth 2.0 provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
router.get('/provider/callback',
  passport.authenticate('provider', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

/* GET login form. */
router.get('/login', function(req, res, next) {
  res.render('login');
});


module.exports = router;
