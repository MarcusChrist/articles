var express = require("express");
var router = express.Router();
var pool = require("../modules/pool");
const { hashPassword } = require("./bcrypt");
const codes = require("../codes");

router.post("/", function (req, res, next) {
  pool.getConnection(function (err, con) {
    if (err) return res.json({ error: codes.connection });
    con.query('select * from users limit 1', function (err, result) {
      console.log(err);
      console.log(result);
      console.log(result[0]);
      if (err) {
        con.release();
        return res.json({ error: codes.error });
      } else if (result[0]) {
        con.release();
        return res.json({ error: "This app already have atleast one admin. Talk to " + result[0].firstName + ' ' + result[0].lastName + ' for more info.' });
      } else {
        var body = req.body;
        hashPassword(body.password, function (err, hash) {
          if (err) {
            con.release();
            return res.json({ error: codes.error });
          }
          con.query('insert into users (firstName, lastName, email, password, role) values( ?, ?, ?, ?, ? )',
            [body.firstName, body.lastName, body.email, hash, 'admin'], function (err, result) {
              con.release();
              if (err) {
                return res.json({ error: "Email already exists!" });
              }
              return res.json({ message: "ok" });
            });
        });
      }
    });
  });
});

module.exports = router;