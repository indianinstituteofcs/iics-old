var express = require('express');
var router = express.Router();

/* GET class page. */
router.get('/', function(req, res, next) {
  res.render('class', { title: 'Indian Institute of Computational Science' });
});

module.exports = router;
