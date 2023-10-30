const express = require("express");
const router = express.Router();

const productsControllers = require("../controllers/products-controller");

router.get("/", productsControllers.getProducts);
router.get("/category/:category", productsControllers.getProductsByCategory);
router.get("/:id", productsControllers.getProductById);
router.post("/add-product", productsControllers.addProduct);
router.patch("/update-product/:id", productsControllers.updateProduct);
router.delete("/delete-product/:id", productsControllers.deleteProduct);

module.exports = router;
