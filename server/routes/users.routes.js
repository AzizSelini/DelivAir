var router = require("express").Router();
const {
  getAll,
  add,
  verify,
  getOneByemail,
  deleteAccount,
  updateFriends,
  getOneById,
  ban,
} = require("../controller/user.controller");
router.get("/", getAll);

router.post("/", add);
router.put("/verify/:id", verify);
router.put("/ban/:id", ban);
router.get("/:email", getOneByemail);
router.get("/id/:id", getOneById);
router.delete("/:id", deleteAccount);

router.put("/:id", updateFriends);

module.exports = router;
