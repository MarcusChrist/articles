var express = require("express");
var router = express.Router();
const authenticateToken = require("../modules/authenticateToken");
var pool = require("../modules/pool");
const { codes } = require("../codes");

router.post("/", authenticateToken, function (req, res, next) {
  pool.getConnection(function (err, con) {
    if (err) return res.json({error: codes.connection});

    var body = req.body;
    con.query('update users set firstName = ?, lastName = ?, email = ?, role = ? where id = ?',
            [body.firstName, body.lastName, body.email, body.role, body.id],function (err, result) {
            con.release();
            if (err) {
                return res.json({error: code.error});
            }
            return res.json({message: "ok"});
        });
  });
});

module.exports = router;