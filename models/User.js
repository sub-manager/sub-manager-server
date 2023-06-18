const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
    min: [9, "phone number must have 9 numbers"],
  },
  password: {
    type: String,
    require: true,
    min: [5, "password must be atleast 3 charachters"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
