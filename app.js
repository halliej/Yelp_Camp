/* eslint no-param-reassign: 0 */
/* eslint no-console: 0 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const flash = require('connect-flash');

const User = require('./models/user');

const commentsRoutes = require('./routes/comments');
const campgroundsRoutes = require('./routes/campgrounds');
const indexRoutes = require('./routes/index');

//const seedDB = require('./seeds');

mongoose.Promise = global.Promise;

// mongodb://<dbuser>:<dbpassword>@ds135747.mlab.com:35747/yelpcamphd
// camper
// password123

// mongoose.connect('mongodb://localhost/yelp_camp_d', { useMongoClient: true });
mongoose.connect('mongodb://camper:password123@ds135747.mlab.com:35747/yelpcamphd', { useMongoClient: true });

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(flash());

app.use(require('express-session')({
  secret: 'traveller',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use(indexRoutes);
app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/comments', commentsRoutes);

//seedDB();

app.listen(port, () => {
  console.log(`YelpCamp running on port ${port}.`);
});
