const User = require("../models/User");
const Subscription = require("../models/Subscription");
const Category = require("../models/Category");
const jwt = require("jsonwebtoken");

module.exports = {
  //

  //
  addCategory: (req, res) => {
    const categoryName = req.body.categoryName;

    const addCate = async () => {
      const newCategory = await new Category({
        categoryName,
      });
      await newCategory.save();
      res.json("Folder Successfully Added ");
    };

    addCate();
  },
};
