const express = require("express");
const router = express.Router();

// Declaring the controller for create the functions
const productsControllers = require("../controllers/products-controller");

// Creating routes for the endpoints
router.get("/", productsControllers.getProducts);
router.get("/category/:category", productsControllers.getProductsByCategory);
router.get("/:id", productsControllers.getProductById);
router.post("/add-product", productsControllers.addProduct);
router.patch("/update-product/:id", productsControllers.updateProduct);
router.delete("/delete-product/:id", productsControllers.deleteProduct);

module.exports = router;
