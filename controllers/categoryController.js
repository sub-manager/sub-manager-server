const Subscription = require("../models/Subscription");
const Category = require("../models/Category");
const User = require("../models/User");

module.exports = {
  allCategory: (req, res) => {
    User.findById(res.locals.user._id)
      .populate({
        path: "subscription",
        populate: {
          path: "category",
        },
      })
      .then((foundSubscription) => {
        const subArr = foundSubscription.subscription;
        const allCategoryArr = [];
        for (sub of subArr) {
          const All = {
            provider_name: sub.providerName,
            subscription_date: sub.date,
            subscription_value: sub.value,
            subscription_cycle: sub.cycle,
          };
          allCategoryArr.push(All);
        }
        res.json(allCategoryArr);
      });
  },

  sportCategory: (req, res) => {
    User.findById(res.locals.user._id)
      .populate({
        path: "subscription",
        populate: {
          path: "category",
        },
      })
      .then((foundSubscription) => {
        const subArr = foundSubscription.subscription;
        const sportCategoryArr = [];
        for (sub of subArr) {
          if (sub.category.categoryName == "Sport") {
            const sportCate = {
              provider_name: sub.providerName,
              subscription_date: sub.date,
              subscription_value: sub.value,
              subscription_cycle: sub.cycle,
            };
            sportCategoryArr.push(sportCate);
          }
        }
        res.json(sportCategoryArr);
      });
  },
};