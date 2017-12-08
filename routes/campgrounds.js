/* eslint no-lonely-if: 0 */
const express = require('express');

const Campground = require('../models/campground');
const middleware = require('../middleware');

const router = express.Router();

router.get('/', (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', { campgrounds });
    }
  });
});

router.post('/', middleware.isLoggedIn, (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  const author = {
    id: req.user._id,
    username: req.user.username
  };
  const newCampground = { name, image, description, author };
  Campground.create(newCampground, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Created campground', campground);
      res.redirect('/campgrounds');
    }
  });
});

router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('campgrounds/new.ejs');
});

router.get('/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec((err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/show', { campground });
    }
  });
});

router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    res.render('campgrounds/edit', { campground });
  });
});

router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err) => {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  });
});

module.exports = router;
