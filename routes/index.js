const express = require('express');
const passport = require('passport');

const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('landing');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => {
      console.log('registered', user);
      res.redirect('/campgrounds');
    });
  });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}));

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logged you out!!');
  res.redirect('/campgrounds');
});

module.exports = router;
