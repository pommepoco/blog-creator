var express = require('express');
var router = express.Router();
var db = require("../models");
var policies =require("../policies");

/* GET Session. */
router.get('/', function(req, res, next) {
    res.json(req.session);
});

router.post("/", function(req, res, next) {
    var bcrypt = require('bcrypt');
    console.log(req.body);
    if (!req.body.password || !req.body.email) {
        res.json({error: 'missing argument'});
        return;
    }

    var passwordHash = bcrypt.hashSync(req.body.password, 10);

    db.User.findOne({email: req.body.email}, function (err, user) {
        if (err || !user) {	// ERROR OR WRONG EMAIL
            res.json({error: err});
            console.error(err);
        } else {
            var result = bcrypt.compareSync(req.body.password, user.password, function (err, result) {
                console.error(err);
            });
            if (result) {	//	Good password
                req.session.authentificated = true;
                user.authentificated = true;
                req.session.user = user;
                user.save(function (err) {	// apply authentificated to database
                    if (err) {
                        console.error(error);
                    }
                });
                res.json({user: req.session.user});
            } else {	// wrong password
                res.json({error: err});
            }
        }
    });
});

router.delete("/", function(req, res, next) {
    //if (!policies.isAuth(req, res, next)) return;
    if (req.session.user && req.session.user._id)
        db.User.findOne({_id: req.session.user._id}, function (err, user) {
            if (err) return console.log(err);
            if (user) {
                user.authentificated = false;
                user.save(function (err) {
                    if (err) console.log(err);
                    else console.log('disconnect apply')
                });
            }
        });
    req.session.user = null;
    req.session.authentificated = false;
    res.json({connection: false});
});


module.exports = router;