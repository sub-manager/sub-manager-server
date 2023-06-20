const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const server = express();
const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.json());
const cors = require("cors");
server.use(cors());
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// BCRYPT REQUIREMENTS
const saltRound = process.env.SALT;
const saltRounds = Number(saltRound);
//

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((e) => {
    console.log(e);
  });

// MODELS
const User = require("./models/User");
const Subscription = require("./models/Subscription");
const Category = require("./models/Category");
server.use(cookieParser());

// USER ROUTER - API
const authRouter = require("./routes/authRoutes");
server.use("/api/user", authRouter);

const postRouter = require("./routes/postsRoutes");
server.use("/api/post", postRouter);

// CATEGORY ROUTE - API
const categoryRouter = require("./routes/categoryRoutes");
server.use("/api/category", categoryRouter);

//
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

server.listen(process.env.PORT, () => {
  console.log(`server is up and running on port: ${process.env.PORT}`);
});
