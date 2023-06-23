const User = require("../models/User");
const Subscription = require("../models/Subscription");
const Category = require("../models/Category");
const moment = require("moment");
const format = require('date-fns');

module.exports = {
  //
  getSubscription: async (req, res) => {
    const user = await User.findById(res.locals.user._id).populate(
      "subscription"
    );
    res.status(200).json(user);
  },
  //
  addSubscription: async (req, res) => {
    const cycle = req.body.cycle; 
    let dueDate = null;
    if (cycle === 'monthly') {
      dueDate = format.add(new Date(req.body.date),{
        days: 23,
      })
    }
    if (cycle === 'weekly') {
      dueDate = format.add(new Date(req.body.date),{
        days: 5,
      })
    }
    if (cycle === 'yearly') {
      dueDate = format.add(new Date(req.body.date),{
        days: 355,
      })      
    } 
    dueDate = format.format(dueDate, 'yyyy-MM-dd')

    const newSub = await Subscription.create(
      {
        user: res.locals.user._id,
        providerName: req.body.providerName,
        isRenew: req.body.isRenew,
        date: req.body.date,
        valuee: req.body.valuee,
        cycle,
        dueDate,
      },      
    );   


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

    res.status(200).json({ newSubscription: newSub });
 
  },

  deleteSubscription: async (req, res) => {
    const deletedSub = await Subscription.findByIdAndDelete(req.params.subId);
    await User.findByIdAndUpdate(res.locals.user._id, {
      $pull: {
        subscription: req.params.subId,
      },
    });
    res.status(200).json({message: 'subscription deleted'});
  },


  updateSubscription: async (req, res) => {
    const updatedSub = await Subscription.findByIdAndUpdate(req.params.subId, {
      providerName: req.body.providerName,
      isRenew: req.body.isRenew,
      date: req.body.date,
      valuee: req.body.valuee,
    });

    res.status(200).json({message: 'subscription updated'});
  },
};
