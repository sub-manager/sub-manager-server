const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const { verifyUser } = require("../middleware/verifyUser");
//


router.post("/addCategory", verifyUser, categoryController.allCategory);

module.exports = router;
