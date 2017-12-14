/* eslint no-lonely-if: 0 */
const Campground = require('../models/campground');
const Comment = require('../models/comment');

const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, campground) => {
      if (err) {
        req.flash('error', 'Campground not found!');
        res.redirect('back');
      } else {
        // Added this block, to check if foundCampground exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
        if (!campground) {
          req.flash('error', 'Item not found.');
          return res.redirect('back');
        }
        // If the upper condition is true this will break out of the middleware and prevent the code

        if (campground.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'You do not have permission to edit this campground!');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that!');
    res.redirect('back');
  }
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, comment) => {
      if (err) {
        req.flash('error', 'Comment not found!');
        res.redirect('back');
      } else {
        if (comment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'You do not have permission to edit this comment!');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that!');
    res.redirect('back');
  }
};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You need to log in to do that!');
  res.redirect('/login');
};

module.exports = middlewareObj;
