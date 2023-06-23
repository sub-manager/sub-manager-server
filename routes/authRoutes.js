const router = require("express").Router();
const postsController = require("../controllers/postsController");
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/signup", userController.register);

router.post("/signin", userController.login);

module.exports = router;
