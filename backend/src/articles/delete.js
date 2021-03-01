var express = require("express");
var router = express.Router();
const authenticateToken = require("../modules/authenticateToken");
var pool = require("../modules/pool");
const { codes } = require("../codes");

router.delete("/:id", authenticateToken, function (req, res, next) {
  pool.getConnection(function (err, con) {
    if (err) return res.json({ error: codes.connection });
    con.query('delete from articles where id = ?', req.params.id, function (err, result) {
      console.log(err);
      con.release();
      if (err) {
        return res.json({ error: "Couldnt find article in database!" });
      }
      return res.json({ message: "ok" });
    });
  });
});

module.exports = router;