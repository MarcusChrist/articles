var express = require("express");
var router = express.Router();
const authenticateToken = require("../modules/authenticateToken");
var pool = require("../modules/pool");
const { hashPassword } = require("./bcrypt");
const codes = require("../codes");

router.post("/", authenticateToken, function (req, res, next) {
  pool.getConnection(function (err, con) {
    if (err) return res.json({error: codes.connection});

    var body = req.body;
    hashPassword(body.password, function(err, hash) {
        if (err) {
            con.release();
            return res.json({error: codes.error});
        }
        con.query('insert into users (firstName, lastName, email, password, role) values( ?, ?, ?, ?, ? )',
                  [body.firstName, body.lastName, body.email, hash, body.role],function (err, result) {
            con.release();
            if (err) {
                return res.json({error: "Email already exists!"});
            }
            return res.json({message: "ok"});
        });
    });
  });
});

module.exports = router;