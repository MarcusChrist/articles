var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
var pool = require("../modules/pool");
const { verifyPassword } = require("./bcrypt");
const codes = require("../codes");

router.post("/", function (req, res, next) {
  console.log("nu")
  pool.getConnection(function (err, con) {
    if (err) return res.json({error: codes.connection});

    var email = req.body.email;
    var password = req.body.password;

    var sql = 'select * from users where email = ' + con.escape(email);
    con.query(sql, function (err, result) {
      con.release();
      // if (err) return res.json({error: codes.notFound + 'user'});
      if (result === undefined || result[0] === undefined) return res.sendStatus(401);

      verifyPassword(password, result[0].password, function (err, found) {
        if (err) return res.json({error: codes.error});
        if (found) {
          const load = {
            id: result[0].id,
            email: result[0].email,
            role: result[0].role
          }
          jwt.sign(load, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
            if (err) return res.json({error: codes.error});
            res.json({
              id: result[0].id,
              email: result[0].email,
              firstName: result[0].firstName,
              lastName: result[0].lastName,
              token: token,
              role: result[0].role
            });
          });
        } else {
          res.statusText = 'email or password is incorrect';
          return res.sendStatus(401);
        }
      });
    });
  });
});

module.exports = router;