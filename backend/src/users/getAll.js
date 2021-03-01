var express = require("express");
var router = express.Router();
const authenticateToken = require("../modules/authenticateToken");
var pool = require("../modules/pool");

router.get("/", authenticateToken, function (req, res, next) {
    pool.getConnection(function (err, con) {
        if (err) return next(err, "getAllUsers1");

        con.query('select * from users', function (err, result) {
            con.release();
            if (err) {
                return next(err, "getAllUsers2");
            }
            res.json(result);
        });
    });
});

module.exports = router;