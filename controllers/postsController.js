const User = require("../models/User");
const Subscription = require("../models/Subscription");
const Category = require("../models/Category");
const jwt = require("jsonwebtoken");

module.exports = {
  //

  getSubscription: async (req, res) => {
    const user = await User.findById(res.locals.user._id).populate(
      "subscription"
    );
    res.json(user);
  },
  //
  addSubscription: async (req, res) => {
    const newSub = await Subscription.create({
      user: res.locals.user._id,
      providerName: req.body.providerName,
      isRenew: req.body.isRenew,
      date: req.body.date,
    });

    await User.findByIdAndUpdate(res.locals.user._id, {
      $addToSet: {
        subscription: newSub._id,
      },
    });

    await Category.findByIdAndUpdate(req.body.categoryId, {
      $addToSet: {
        subscriptionInfo: newSub._id,
      },
    });

    res.json({ newSub });
  },

  deleteSubscription: async (req, res) => {
    const deletedSub = await Subscription.findByIdAndDelete(req.params.subId);
    await User.findByIdAndUpdate(res.locals.user._id, {
      $pull: {
        subscription: deletedSub._id,
      },
    });
    res.json(deletedSub);
  },

  updateSubscription: async (req, res) => {
    const updatedSub = await Subscription.findByIdAndUpdate(req.params.subId, {
      providerName: req.body.providerName,
      isRenew: req.body.isRenew,
      date: req.body.date,
    });

    res.json(updatedSub);
  },
};
