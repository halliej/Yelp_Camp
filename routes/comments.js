/* eslint no-param-reassign: 0 */
/* eslint no-lonely-if: 0 */
const express = require('express');

const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware');

const router = express.Router({ mergeParams: true });

router.get('/new', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      res.render('comments/new', { campground });
    }
  });
});

router.post('/', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      Comment.create(req.body.comment, (error, comment) => {
        if (error) {
          console.log(error);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          res.redirect(`/campgrounds/${campground._id}`);
        }
      });
    }
  });
});

router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (err, comment) => {
    if (err) {
      res.redirect('back');
    } else {
      res.render('comments/edit', { campground_id: req.params.id, comment });
    }
  });
});

router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err) => {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

module.exports = router;
