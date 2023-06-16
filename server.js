const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const server = express();

server.use(express.json());
//

server.get("/", (req, res) => {
  res.status(200).json({ success: "server is running" });
});

server.listen(process.env.PORT, () => {
  console.log(`server is up and running on port: ${process.env.PORT}`);
});
