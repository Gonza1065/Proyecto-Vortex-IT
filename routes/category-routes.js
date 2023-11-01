const express = require("express");
const router = express.Router();

// Declaring the controller for create the functions
const categoriesController = require("../controllers/categories-controller");

// Creating routes for endpoints
router.get("/", categoriesController.getCategories);
router.get("/:id", categoriesController.getCategoryById);
router.post("/add-category", categoriesController.addCategory);
router.patch("/update-category/:id", categoriesController.updateCategory);
router.delete("/delete-category/:id", categoriesController.deleteCategory);

module.exports = router;
