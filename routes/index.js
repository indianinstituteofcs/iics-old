var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    error: false
  });
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    user: req.user
  });
})

module.exports = router;