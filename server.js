const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const server = express();
server.use(express.json());

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
const Folder = require("./models/Folder");

// USER ROUTER - API
const authRouter = require("./routes/authRoutes");
server.use("/api/user", authRouter);


server.get("/", (req, res) => {
  res.status(200).json({ success: "server is running" });
});

server.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;

  const isPhone = (phoneNumber) => {
    if (phoneNumber.length != 9) {
      res
        .status(401)
        .json({ alertMessage: "Phone number should has 9 number" });
    }
  };

  const isEmail = (Email) => {
    let splitElements = Email.split("");

    let atIndex = splitElements.indexOf("@");
    let dotIndex = splitElements.indexOf(".");

    splitElements.splice(atIndex + 1, 0, "-");
    splitElements.splice(atIndex, 0, "-");

    splitElements.splice(dotIndex + 3, 0, "-");
    splitElements.splice(dotIndex + 2, 0, "-");

    let toString = splitElements.join("");
    let emailSections = toString.split("-");

    let lettersAndNumbers = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    let symbols = ["-", ".", "_"];

    let firstIndex = [];
    let toLower = emailSections[0].toLowerCase();

    for (item of lettersAndNumbers) {
      if (toLower.startsWith(item.toLowerCase())) {
        firstIndex.push(item.toLowerCase());
      }
    }

    if (emailSections[2] == "" || emailSections[2] == " ") {
      return false;
    } else if (!emailSections[3].includes(".")) {
      return false;
    } else if (!emailSections[4].includes("com")) {
      return false;
    }

    let firstLitter = firstIndex.toString();
    if (toLower[0] == firstLitter) {
      return true;
    } else if (toLower[0] != firstLitter) {
      return false;
    }

    for (atCheck of emailSections[1]) {
      if (atCheck != "@") {
        return false;
      }
    }
  };

  if (isEmail(email) == false) {
    res.status(401).json({ alertMessage: "Your email syntax is not correct" });
    return;
  }

  isPhone(phone);

  const createUserAccount = async () => {
    try {
      // TO ENCRYPT THE PASSWORD
      const foundUser = await User.findOne({ email });

      if (foundUser.email === email) {
        res.status(401).json({ "alert Message": "This user already exist" });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // USER COLLECTION
      const newUser = await new User({
        username,
        email,
        phone,
        password: hashedPassword,
      });

      const userCreated = await newUser.save();
      const token = JWT.sign(
        {
          user: {
            id: userCreated._id,
            username: userCreated.username,
          },
        },
        process.env.SECRET,
        { expiresIn: "12h" }
      );

      res.json({
        userInfo: {
          id: userCreated._id,
          username: userCreated.username,
          email: userCreated.email,
          phone: userCreated.phone,
        },
        token,
      });
    } catch (e) {
      res.status(400).json({ errorMessage: "error" });
    }
  };
  createUserAccount();
});

server.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const loginToSystem = async () => {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      res.status(400).json({ errorMessage: "Not found user" });
      return;
    }

    const hashedPassword = foundUser.password;
    const response = await bcrypt.compare(password, hashedPassword);

    if (response == true) {
      const token = JWT.sign(
        {
          user: {
            id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
            phone: foundUser.phone,
          },
        },
        process.env.SECRET,
        { expiresIn: "12h" }
      );

      res.json({
        userInfo: {
          id: foundUser._id,
          username: foundUser.username,
          email: foundUser.email,
          phone: foundUser.phone,
        },
        token,
      });
    } else {
      res.status(401).json({ alertMessage: "Incorrect password" });
    }
  };

  loginToSystem();
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
