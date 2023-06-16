const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const server = express();

server.use(express.json());
//

mongoose
  .connect(
    "mongodb+srv://musab:8RNngQeVDJNhsh8M@sub.ya0nbol.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((e) => {
    console.log(e);
  });

const User = require("./models/User");
server.get("/", (req, res) => {
  res.status(200).json({ success: "server is running" });
});

// create user
server.post("/auth/signup", async (req, res) => {
  const { username, email, phone, password } = req.body;
  const createdUser = await User.create({
    username,
    email,
    phone,
    password,
  });
  res.status(200).json(createdUser);
});

// login user
server.post("/auth/login", (req, res) => {});

//add subscription
server.listen(process.env.PORT, () => {
  console.log(`server is up and running on port: ${process.env.PORT}`);
});
