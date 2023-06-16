const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const folderSchema = new Schema({
  folderName: {
    type: String,
    require: true,
  },
  description: {
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

const Folder = mongoose.model("Folder", folderSchema);
module.exports = Folder;
