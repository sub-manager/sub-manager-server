const User = require("../models/User");
const Subscription = require("../models/Subscription");
const Folder = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  //
  test: (req, res) => {
    res.json("hi test");
  },

  //
  addSubscription: async (req, res) => {
    const { providerName, isRenew, date, folderInfo } = req.body;
    const newSub = await Subscription.create({
      providerName,
      isRenew,
      date,
    });
    res.json({ newSub });
  },
};
