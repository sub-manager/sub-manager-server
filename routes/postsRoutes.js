const router = require("express").Router();
const postsController = require("../controllers/postsController");
const { verifyToken } = require("../middleware/verifyToken");
const { verifyUser } = require("../middleware/verifyUser");
//

//

router.post("/add", verifyUser, postsController.addSubscription);

module.exports = router;
