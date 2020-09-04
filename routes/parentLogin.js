var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  console.log("JCTest: Inside router for login");
  res.render('parentLogin', {title: "XXX"});
});

module.exports = router;
