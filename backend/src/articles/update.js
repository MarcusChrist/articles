var express = require("express");
var router = express.Router();
const authenticateToken = require("../modules/authenticateToken");
var pool = require("../modules/pool");
const { codes } = require("../codes");

router.post("/", authenticateToken, function (req, res, next) {
  pool.getConnection(function (err, con) {
    if (err) return res.json({error: codes.connection});

    var body = req.body;
    con.query('update articles set name = ?, url = ?, type = ?, description = ? where id = ?',
            [body.name, body.url, body.type, body.description, body.id],function (err, result) {
            con.release();
            if (err) {
                return res.json({error: code.error});
            }
            return res.json({message: "ok"});
        });
  });
});

module.exports = router;