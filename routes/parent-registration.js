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