const router = require("express").Router();
const postsController = require("../controllers/postsController");
const { verifyToken } = require("../middleware/verifyToken");
//

//
router.get("/test", verifyToken, postsController.test);

router.post("/add", verifyToken, postsController.addSubscription);

module.exports = router;
