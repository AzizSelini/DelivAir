var router = require("express").Router();
const {
  deleteReview,
  addReview,
  getByReviewReciver,
  updateReview,
  getByReviewSender,
} = require("../controller/review.controller");

router.get("/sender/:id", getByReviewSender);
router.get("/:id", getByReviewReciver);
router.put("/", updateReview);
router.post("/", addReview);
router.delete("/", deleteReview);

module.exports = router;
