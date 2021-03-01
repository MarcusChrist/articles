
var bcrypt = require('bcrypt');
var saltRounds = 16;

function hashPassword(password, callback) {
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, hash);
        }
    });
};

function verifyPassword(password, hash, callback) {
    bcrypt.compare(password, hash, function(err, result) {
        if (err) return callback(err, false);
        if (result) {
            return callback(null, true);
        }
        else {
            return callback(null, false);
        }
    });
}

exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;