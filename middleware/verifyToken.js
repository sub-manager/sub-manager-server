const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  // check if token exist
  if (token) {
    jwt.verify(token, process.env.JWT_TOKEN, (err, decodedToken) => {
      if (err) {
        console.log(e.message);
        res.json({ error: "invalid token" });
        // res.redirect("/api/user/login");
      } else {
        console.log(decodedToken);
        // res.json(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/api/user/test");
  }
};

module.exports = { verifyToken };
