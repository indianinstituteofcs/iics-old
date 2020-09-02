const express = require('express');
const router = express.Router();
const Student = require("../models/student.js")
const Parent = require("../models/parent.js")

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
    student_name,
    student_email,
    parent_name,
    parent_email,
    password
  } = req.body;
  let errors = [];
  console.log(' Student Name ' + student_name + ' parent_email :' + parent_email + ' pass:' + password);

  if (!student_name || !student_email || !parent_name || !parent_email || !password) {
    errors.push({
      msg: "Please fill in all fields"
    })
  }

  if (errors.length > 0) {
    res.render('admin', {
      errors: errors,
      student_name: student_name,
      student_email: student_email,
      parent_name: parent_name,
      parent_email: parent_email,
      password: password
    })
  } else {
    // check if student exists 
    Student.findOne({
      email: student_email
    }).exec((err, user) => {
      console.log(user);
      if (user) {
        errors.push({
          msg: 'student already registered'
        });
        render(res, errors, student_name, student_email, password);
      } else {
        const newStudent = new Student({
          name: student_name,
          email: student_email,
          password: password,
          parent_email: parent_email
        });
        const newParent = new Parent({
          name: parent_name,
          email: parent_email,
          password: password,
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
router.post('/login', (req, res, next) => {})

//logout
router.get('/logout', (req, res) => {})
module.exports = router;