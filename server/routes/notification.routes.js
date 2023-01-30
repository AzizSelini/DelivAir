var router = require("express").Router();
const {
  updateNotification,
  getNotifactionByReciver,
  deleteNotification,
  sendNotification,
} = require("../controller/notification.controller");

router.get("/", getNotifactionByReciver);
router.post("/", sendNotification);
router.put("/", updateNotification);
router.delete("/", deleteNotification);
module.exports = router;
