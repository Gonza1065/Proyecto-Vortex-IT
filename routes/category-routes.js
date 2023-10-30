const express = require("express");

const categoriesController = require("../controllers/categories-controller");

const router = express.Router();

router.get("/", categoriesController.getCategories);
router.get("/:id", categoriesController.getCategoryById);
router.post("/add-category", categoriesController.addCategory);
router.patch("/update-category/:id", categoriesController.updateCategory);
router.delete("/delete-category/:id", categoriesController.deleteCategory);
module.exports = router;
