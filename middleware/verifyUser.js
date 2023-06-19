const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv").config();

const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).send("Access Denied");

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);

    let user = await User.findById(decodedToken.user.id);
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("invalid token");
  }
};

module.exports = { verifyUser };
