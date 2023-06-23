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

const Subscription = require("./models/Subscription");

const authRouter = require("./routes/authRoutes");
server.use("/api/user", authRouter);

const postRouter = require("./routes/postsRoutes");
server.use("/api/post", postRouter);

const categoryRouter = require("./routes/categoryRoutes");
server.use("/api/user/category", categoryRouter);

//
server.get("/test", (req, res) => {
  res.status(200).json({ success: "server is running" });
});

async function sendEmails(subscription) {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });


  await transporter.sendMail({
    from: `"sub manager" <${process.env.USER}>`,
    to: subscription.user.email,
    subject: "subscription renewal",
    html: `
    
    <h1>Hello,${subscription.user.username} </h1>
    <P> Your subscription to ${subscription.providerName} will renew 7 days from now, on
    Thursday, 22 June 2023.
    The value of this subscription is ${subscription.value} SAR per month.
    Visit your subscriptions homepage.</P>
    `,
  });
}


const job = () => {
  schedule.scheduleJob("57  10 * * *", async () => {
    const subscription = await Subscription.find().populate("user");
    subscription.forEach((sub) => {
      const due_date = moment.utc(sub.dueDate).format('YYYY-MM-DD');
      const currDate = moment.utc(Date.now()).format('YYYY-MM-DD');
      console.log(`due: ${due_date}`);
      console.log(`current: ${currDate}`);
      if (due_date === currDate) {
        sendEmails(sub);
        console.log('email sent');
      }else{
        console.log('email wasnt sent');

      }
    });
  });
};

job();







server.listen(process.env.PORT, () => {
  console.log(`server is up and running on port: ${process.env.PORT}`);
});
