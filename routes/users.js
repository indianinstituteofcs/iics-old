const express = require('express');
const router = express.Router();
const Student = require("../models/student.js")
const Parent = require("../models/parent.js")
const bcrypt = require('bcrypt');
const passport = require('passport');
const currentParent = "";

//parentLogin handle
router.get('/parentLogin', (req, res) => {
  res.render('parentLogin');
})

router.get('/parentRegistration', (req, res) => {
  res.render('register')
})

//Register handle
router.post('/parentRegistration', (req, res) => {
  const {
    username
  } = req.body;
  let errors = [];
  console.log('JCTest: In parentRegistration: inputEmail:' + username);

  if (!username) {
    errors.push({
      msg: "Please enter email address"
    })
  }

  if (errors.length > 0) {
    res.render('parentLogin', {
      errors: errors
    })
  } else {
    // check if parent exists 
    Parent.findOne({parentEmail: username}).exec((err, user) => {
      console.log(user);

      if (user) {
        errors.push({
          msg: 'This email is already registered. Please log in with it.'
        });
        res.render(res, errors, username);
      } else {
        console.log('JCTest:parentRegistration: User does not exist in database. To registration:' + username);
        currentParent = username;
        res.redirect('/registration'); //Go to registration page to complete.
      }
    })
  }
})

//Register handle
router.post('/register', (req, res) => {
  const {
    parentFirstName,
    parentLastName,
    parentEmail,
    parentEmailConfirmation,
    parentPassword,
    parentPasswordConfirm
  } = req.body;
  let errors = [];
  console.log(' parentEmail:' + parentEmail + ' pass:' + parentPassword);

  if (!parentFirstName || !parentLastName || !parentEmail || !parentEmailConfirmation || !parentPassword || !parentPasswordConfirm) {
    errors.push({
      msg: "Please fill in all fields"
    })
  }

  if (errors.length > 0) {
    res.render('/parentLogin', {
      errors: errors,
      parentFirstName: parentFirstName,
      parentLastName: parentLastName,
      parentEmail: parentEmail,
      parentEmailConfirmation:parentEmailConfirmation,
      parentPassword: parentPassword,
      parentPasswordConfirm: parentPasswordConfirm
    })
  } else {
    // check if parent exists 
    Parent.findOne({parentEmail: parentEmail}).exec((err, user) => {
      console.log(user);

      if (user) {
        errors.push({
          msg: 'Parent already registered'
        });
        res.render(res, errors, parentEmail);
      } else {
        const newParent = new Parent({
          parentFirstName: parentFirstName,
          parentLastName: parentLastName,
          parentEmail: parentEmail,
          parentEmailConfirmation:parentEmailConfirmation,
          parentPassword: parentPassword,
          parentPasswordConfirm: parentPasswordConfirm
            });

        // hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newParent.parentPassword, salt, (err, hash) => {
              if (err) throw err;
              newParent.parentPassword = hash;
              newParent.save().then((value) => {
                console.log(value)
                res.redirect('/'); //Should go to enroll page.
              }).catch(value => console.log(value));
            })
        )
      }
    })
  }
})

router.post('/parentLogin', (req, res, next) => {
  console.log("JCTest: parentLogin script is invoked", req.body);
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/parentLogin',
  })(req, res, next);
})

//logout
router.get('/logout', (req, res) => {})
module.exports = router;