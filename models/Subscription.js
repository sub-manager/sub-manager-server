const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  providerName: {
    type: String,
    require: true,
  },
  isRenew: {
    type: Boolean,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  folderInfo: [
    {
      type: Schema.Types.ObjectId,
      ref: "Folder",
    },
  ],
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
