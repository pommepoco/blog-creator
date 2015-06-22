var express = require('express');
var router  = express.Router();
var db      = require("../models");
var conf    = require("../config");
var rules   = require("../rules");

router.get("/", rules.isBlog, function(req, res, next) {
  var blog = db.Blog.findOne({subDomain: req.subDomain}, function(err, blog) {
    if (!blog) return res.status(404).render("error", {title: "ERROR", error: {stack: "Ce blog n'existe pas. :("}});
    res.render('blog/index', { title: blog.name });
  });
});

router.get("/blog", function(req, res, next) {
  db.Blog.find(req.body, function(err, records) {
    if (err) return res.status(500).json({error: err});
    res.json(records);
  });
});

router.get("/blog/:id", function(req, res, next) {
  db.Blog.findOne({_id: new db.ObjectId(req.params.id)}, function(err, record) {
    if (err) return res.status(500).json({error: err});
    res.json(record);
  });
});

router.post("/blog", function(req, res, next) {
  var blog = db.Blog(req.body);
  blog.save(function(err, record) {
    if (err) return res.status(500).json({error: err});
    res.json(record);
  });
});

router.put("/blog/:id", function(req, res, next) {
  db.Blog.update({_id: new db.ObjectId(req.params.id)}, req.body, function(err, record) {
    if (err) return res.status(500).json({error: err});
    res.json(record);
  });
});

router.delete("/blog/:id", function(req, res, next) {
  db.Blog.remove({_id: new db.ObjectId(req.params.id)}, function(err, del) {
    if (err) return res.status(500).json({error: err});
    res.json(del);
  });
});

module.exports = router;