// const router = require("express").Router;
const router = require("express").Router();
const postsController = require("../controllers/postsController");

// TO GET BODY
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// #REGISTRATION ROUTE
router.get("/test", postsController.addSubscription);

module.exports = router;
