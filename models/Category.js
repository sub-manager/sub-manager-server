const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryName: {
    type: String,
    require: true,
  },
  subscriptionInfo: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
