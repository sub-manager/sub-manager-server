// const router = require("express").Router;
const router = require("express").Router();
const userController = require("../controllers/userController");

// TO GET BODY
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// #REGISTRATION ROUTE - API
router.post("/signup", userController.register);

// #LOGIN ROUTE - API
router.post("/signin", userController.login);

module.exports = router;
