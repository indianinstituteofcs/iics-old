var express = require('express');
var router = express.Router();

/* GET class page. */
router.get('/', function(req, res, next) {
  res.render('class', { title: 'IICS:Class' });
});

module.exports = router;
