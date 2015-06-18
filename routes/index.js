var express = require('express');
var router = express.Router();
var policies = require("../policies");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
