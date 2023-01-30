var router = require("express").Router();
const {
  getAll,
  addProduct,
  getbyShipper,
  updateProduct,
  getbysender,
} = require("../controller/product.controller");
router.get("/", getAll);
router.post("/", addProduct);
router.put("/", updateProduct);
router.get("/shipper/:id", getbyShipper);
router.get("/sender/:id", getbysender);

module.exports = router;
