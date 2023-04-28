const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token)
  if (!token) res.status(401).json({success:false, message: "You are not authenticated"});

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.status(403).json({success:false, message: "Session invalid"});
    req.user = user;
  });
  next();
};


module.exports = {verifyToken};