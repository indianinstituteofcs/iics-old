var express = require('express');
var router = express.Router();
const Student = require("../models/student.js")
const Parent = require("../models/parent.js")
const bcrypt = require('bcrypt');
const passport = require('passport');

/* GET admin page. */
router.get('/', function (req, res, next) {
  console.log("JCTEST:parent-registration:GET");
  res.render('parent-registration', {
    title: 'IICS:Register'
  });
});

router.get('/parentEmailCheck', (req, res) => {
  res.render('/')
})

//Register handle
router.post('/parentEmailCheck', (req, res) => {
  const {
    username
  } = req.body;
  let errors = [];
  console.log('JCTest: In parentEmailCheck: inputEmail:' + username);

  //validation that username is an email.
  //If not an email how do we display error message and go to appriate screen.
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
      console.log("User from database: " + user);

      if (user) {
        errors.push({
          msg: 'This email is already registered. Please log in with it.'
        });
        res.render(res, errors, username);
      } else {
        console.log('JCTest:parentEmailCheck: User does not exist in database. To registration:' + username);
        res.redirect('/parent-registration?currentParent=' + username);
        //res.render('parent-registration', { currentParent: username }); //Go to registration page to complete.
      }
    })
  }
})

//Register handle
router.post('/Zregister', (req, res) => {
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

module.exports = router;