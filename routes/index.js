var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/detailed_index', function(req, res, next) {
  res.render('detailed_index');
});
router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;
