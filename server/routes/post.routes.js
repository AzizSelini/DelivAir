var router = require("express").Router();

const {
  getAllPosts,
  newPost,
  deletePost,
  updatePost,
} = require("../controller/post.controller");

router.get("/", getAllPosts);
router.post("/", newPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

module.exports = router;
