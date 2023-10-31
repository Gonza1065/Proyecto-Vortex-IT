const express = require("express");

const cartController = require("../controllers/cart-controller");

const router = express.Router();

router.get("/", cartController.viewCart);
router.get("/quantity-products", cartController.viewCartQuantity);
router.get("/price-total", cartController.viewPriceTotal);
router.post("/add-product-cart", cartController.addProductToCart);
router.patch("/update-product-cart/:id", cartController.updateProductToCart);
router.delete("/delete-product-cart/:id", cartController.deleteProductToCart);
router.delete("/delete-cart", cartController.deleteCart);

module.exports = router;
