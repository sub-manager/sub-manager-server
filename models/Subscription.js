const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  providerName: {
    type: String,
    require: true,
  },
  isRenew: {
    type: Boolean,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
