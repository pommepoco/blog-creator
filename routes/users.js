var express = require('express');
var router = express.Router();
var db = require("../models");
var conf = require("../config");
var policies = require("../rules");

/* GET users listing. */
router.get('/', function(req, res, next) {
  // get all user without password field
  db.User.find(req.query, {password: 0}, function(err, data) {
    if (err) {
      res.json(err);
    } else {
      console.log(data);
      res.json({users: data});
    }
  });
});

router.post("/", function(req, res, next) {
  var bcrypt = require('bcrypt');
  var params = req.body;

  if (params.password)
    params.password = bcrypt.hashSync(params.password, 10);
  params.confirm = null;
  var user = db.User(params);
  user.save(function (err, data) {
    if (err) {
      req.params.password = null;
      req.params.confirm = null;
      res.json({error: err});
      console.log(err);
    } else {
      data.password = undefined;
      req.session.authentificated = true;
      req.session.user = data;
      res.json({res: true, user: data});
    }
  });
});

router.put("/:id", function(req, res, next) {
  res.json(req.body);
});


router.delete("/:id", function(req, res, next) {
  if (policies.isAdmin) return;
  db.User.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.json(err);
      console.error(err);
    }
    else
      console.log({message: 'User removed from the Database!'});
  });
  res.json({delete: req.param('id')});
});

module.exports = router;
