const router = require("express").Router();
const postsController = require("../controllers/postsController");
const { verifyUser } = require("../middleware/verifyUser");
//

//

router.get("/subscriptions", verifyUser, postsController.getSubscription);
router.post("/add", verifyUser, postsController.addSubscription);

router.delete(
  "/deleteSub/:subId",
  verifyUser,
  postsController.deleteSubscription
);

router.put("/updateSub/:subId", verifyUser, postsController.updateSubscription);

module.exports = router;
