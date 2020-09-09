var express = require('express');
var router = express.Router();
const Student = require("../models/student.js")
const Parent = require("../models/parent.js")
const bcrypt = require('bcrypt');
const passport = require('passport');


/* GET login page. */
router.get('/', function(req, res, next) {
  console.log("JCTest: Inside router for login");
  res.render('parentLogin', {title: "IICS:Login"});
});


module.exports = router;
