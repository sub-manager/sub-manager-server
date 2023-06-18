const User = require("../models/User");
const Subscription = require("../models/Subscription");
const Folder = require("../models/User");

const JWT = require("jsonwebtoken");
// BCRYPT REQUIREMENTS
const bcrypt = require("bcrypt");
const saltRound = process.env.SALT;
const saltRounds = Number(saltRound);

module.exports = {
  // USER REGISTRATION - API
  register: (req, res) => {
    res.json({ Test: "hi" });
  },
};
