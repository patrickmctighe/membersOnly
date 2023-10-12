const Member = require('../models/member');
const Message = require('../models/message');
const { body, validationResult } = require('express-validator');
const async = require('async');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const asyncHandler = require('express-async-handler');
const { DateTime } = require('luxon');

passport.use(
  new LocalStrategy(async (member_username, member_password, done) => {
    try {
      const member = await Member.findOne({ member_username: member_username });
      if (!member) {
        return done(null, false, { message: 'Incorrect username' });
      }
      const passwordMatch = await bcrypt.compare( member_password, member.member_password);
      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, member);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((member, done) => {
  done(null, member.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const member = await Member.findById(id);
    done(null, member);
  } catch (err) {
    done(err);
  }
});

exports.index = function (req, res) {
  // Implement logic for rendering the index page
  // For example, fetch data from the database
  // and render the page using res.render('index', { data });
  res.render('index', { member: req.user });
};

// Display the sign-up form
exports.signUpGet = function (req, res) {
    res.render('sign-up-form', { errors: [] });
};
  
  // Handle sign-up form submission
  exports.signUpPost = asyncHandler(async (req, res, next) => {
    // Validation middleware
    const errors = validationResult(req);

    if (req.body.member_password !== req.body.member_password_confirm) {
        errors.errors.push({ msg: 'Passwords do not match' });
      }

    if (!errors.isEmpty()) {
      // Handle validation errors (e.g., re-render the form with error messages)
      return res.render('sign-up-form', { errors: errors.array() });
    }
  try {
    const hashedPassword = await bcrypt.hash(req.body.member_password, 10);
    const hashedPasswordConfirm = await bcrypt.hash(req.body.member_password_confirm, 10);

    // Create a new member instance
    const newMember = new Member({
      member_first_name: req.body.member_first_name,
      member_last_name: req.body.member_last_name,
      member_username: req.body.member_username,
      member_password: hashedPassword,
      member_password_confirm: hashedPasswordConfirm,
      member_email: req.body.member_email,
      membership_status: req.body.membership_status,
    });
  
    // Save the member to the database
    await newMember.save();
  
    // Redirect to a success page or any other desired action
    res.redirect('/');}
    catch (err) {
      return next(err);
    }
  });

exports.logIn = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
});

exports.logOut = function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
