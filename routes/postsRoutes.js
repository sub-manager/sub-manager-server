const router = require("express").Router();
const postsController = require("../controllers/postsController");
const { verifyUser, checkUser } = require("../middleware/verifyUser");
//

//

router.get("/subs", checkUser, postsController.getSubscription);
router.post("/add", checkUser, postsController.addSubscription);

router.delete(
  "/deleteSub/:subId",
  checkUser,
  postsController.deleteSubscription
);

router.put("/updateSub/:subId", checkUser, postsController.updateSubscription);

module.exports = router;
