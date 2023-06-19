const router = require("express").Router();
const postsController = require("../controllers/postsController");
const { verifyUser } = require("../middleware/verifyUser");
//

//

router.post("/add", verifyUser, postsController.addSubscription);

router.delete(
  "/deleteSub/:subId",
  verifyUser,
  postsController.deleteSubscription
);

module.exports = router;
