var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Indian Institute of Computational Science' });
});

module.exports = router;
