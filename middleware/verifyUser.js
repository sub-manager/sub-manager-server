const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv").config();

const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const cookie = req.cookies.jwt;

  if (!token) return res.status(401).send("Access Denied");

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);

    let user = await User.findById(decodedToken.user.id);
    res.locals.user = user;
    console.log(res.locals.user._id);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("invalid token");
  }
};

const checkUser = (req, res, next) => {
  const tokenn = req.cookies.jwt;
  if (tokenn) {
    jwt.verify(tokenn, process.env.JWT_TOKEN, async (e, decodedToken) => {
      if (e) {
        console.log(e.message);
        res.locals.instructor = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;

        // console.log(res.locals.user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
module.exports = { verifyUser, checkUser };
