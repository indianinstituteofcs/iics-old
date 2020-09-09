var express = require('express');
var router = express.Router();
const Student = require("../models/student.js")
const Parent = require("../models/parent.js")
const bcrypt = require('bcrypt');
const passport = require('passport');


/* GET login page. */
router.get('/', function(req, res, next) {
  console.log("JCTest: Inside router for login");
  res.render('parent-account', {title: "IICS:Login"});
});

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

module.exports = router;
