const jwt = require("jsonwebtoken");
const codes = require("../codes");

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.sendStatus(401) // if there isn't any token
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if (decoded) {
      req.id = decoded.id
      req.email = decoded.email
      req.role = decoded.role
      next()
    } else { 
      return res.sendStatus(401);
    }
  } catch (err) {
    console.error(err)
    return res.sendStatus(401);
  }
}

exports = module.exports = authenticateToken;