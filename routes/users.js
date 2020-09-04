const express = require('express');
const router = express.Router();
const Student = require("../models/student.js")
const Parent = require("../models/parent.js")
const bcrypt = require('bcrypt');
const passport = require('passport');

//login handle
router.get('/login', (req, res) => {
  res.render('login');
})
router.get('/register', (req, res) => {
  res.render('register')
})
//Register handle
router.post('/register', (req, res) => {
  const {
    studentFirstName,
    studentLastName,
    school,
    grade,
    parentFirstName,
    parentLastName,
    reln2Students,
    parentEmail,
    password,
    studentEmail
  } = req.body;
  let errors = [];
  console.log(' parentEmail:' + parentEmail + ' pass:' + password);

  if (!parentFirstName || !parentLastName || !reln2Students || !parentEmail || !password || !studentEmail) {
    errors.push({
      msg: "Please fill in all fields"
    })
  }

  if (errors.length > 0) {
    res.render('/login', {
      errors: errors,
      parentFirstName: parentFirstName,
      parentLastName: parentLastName,
      reln2Students: reln2Students,
      parentEmail: parentEmail,
      password: password,
      studentEmail: studentEmail,
      studentFirstName: studentFirstName,
      studentLastName: studentLastName,
      grade: grade,
      school: school
    })
  } else {
    // check if student exists 
    Student.findOne({
      email: studentEmail
    }).exec((err, user) => {
      console.log(user);
      if (user) {
        errors.push({
          msg: 'Student already registered'
        });
        res.render(res, errors, studentEmail, parentEmail);
      } else {
        const newStudent = new Student({
          studentFirstName: studentFirstName,
          studentLastName: studentLastName,
          email: studentEmail,
          school: school,
          grade: grade,
          password: password,
          parentEmail: parentEmail,

        });
        const newParent = new Parent({
          parentFirstName: parentFirstName,
          parentLastName: parentLastName,
          parentEmail: parentEmail,
          studentEmail: studentEmail,
          reln2Students: reln2Students,
          password: password
        });

        // hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newStudent.password, salt,
            (err, hash) => {
              if (err) throw err;
              newStudent.password = hash;
              newParent.password = hash;
              newStudent.save().then((value) => {
                console.log(value)
                res.redirect('/users/login');
              }).catch(value => console.log(value));
              newParent.save().then((value) => {
                console.log(value)
                res.redirect('/users/login');
              }).catch(value => console.log(value));
            })
        )
      }
    })
  }
})

router.post('/login', (req, res, next) => {
  console.log("JCTest: login script is invoked", req.body);
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })(req, res, next);
})

//logout
router.get('/logout', (req, res) => {})
module.exports = router;