// const router = require("express").Router;
const router = require("express").Router();
const userController = require("../controllers/userController");

// TO GET BODY
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// #REGISTRATION ROUTE
router.get("/test", userController.register);

module.exports = router;
