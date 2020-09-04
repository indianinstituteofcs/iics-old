const express = require('express');
const router = express.Router();
const Student = require("../models/student.js")
const Parent = require("../models/parent.js")
const bcrypt = require('bcrypt');
const passport = require('passport');

//parentLogin handle
router.get('/parentLogin', (req, res) => {
  res.render('parentLogin');
})
router.get('/register', (req, res) => {
  res.render('register')
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