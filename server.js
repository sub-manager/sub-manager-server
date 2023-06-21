const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const schedule = require("node-schedule");
const nodeMailer = require("nodemailer");
const moment = require("moment");

const server = express();

const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.json());

server.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((e) => {
    console.log(e);
  });

// MODELS
const Subscription = require("./models/Subscription");
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

async function sendEmails(email) {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "mosabalbishi@gmail.com",
      pass: "xoxdfdbeuobzfybb",
    },
  });

  await transporter.sendMail({
    from: '"musab" <mosabalbishi@gmail.com>',
    to: email,
    subject: "Testing, testing, 123",
    html: `
    <h1>Hello there</h1>
    <p>Isn't NodeMailer useful?</p>
    `,
  });
}

const job = () => {
  schedule.scheduleJob("* * * * *", async () => {
    const subscription = await Subscription.find().populate("user");
    subscription.forEach((sub) => {
      const myDate = moment.utc(sub.date).format("YYYY-MM-DD");
      const currDate = moment.utc(Date.now()).format("YYYY-MM-DD");
      if (myDate === currDate) {
        sendEmails(sub.user.email);
      }
    });
  });
};

]job();

console.log(job);

server.listen(process.env.PORT, () => {
  console.log(`server is up and running on port: ${process.env.PORT}`);
});
