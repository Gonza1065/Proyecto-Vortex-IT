// Importing the models
const Category = require("../models/category");
const Product = require("../models/product");

// http://localhost:5000/api/category/ <- URL where the function is executed
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (categories) {
      return res.status(200).json(categories);
    } else {
      return res.status(404).json({ message: "Couldn't find the categories" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error for find the categories" });
  }
};

// http://localhost:5000/api/category/:id <- URL where the function is executed
const getCategoryById = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    const categoryFound = await Category.findById(categoryId);
    if (categoryFound) {
      return res.status(200).json(categoryFound);
    } else {
      return res.status(404).json({ message: "Couldn't find the category" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error for find the category" });
  }
};

// http://localhost:5000/api/category/add-category/ <- URL where the function is executed
const addCategory = async (req, res, next) => {
  const { name } = req.body;
  try {
    const existingCategory = await Category.findOne({ name: name });
    if (existingCategory) {
      return res
        .status(409)
        .json({ message: "Couldn't create because already exist" });
    }
    const newCategory = new Category({ name });
    await newCategory.save();
    return res.status(201).json(newCategory);
  } catch (err) {
    return res.status(500).json({ message: "Error couldn't add the category" });
  }
};

// http://localhost:5000/api/category/update-category/:id <- URL where the function is executed
const updateCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  const { name } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );
    if (updatedCategory) {
      return res.status(200).json(updatedCategory);
    } else {
      return res
        .status(404)
        .json({ message: "Category not found for updating" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error updating the category" });
  }
};

// http://localhost:5000/api/category/delete-category/:id <- URL where the function is executed
const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    const categoryToDelete = await Category.findById(categoryId);
    if (!categoryToDelete) {
      return res
        .status(404)
        .json({ message: "Category not found for delete it" });
    }
    const deletedCategory = await Category.findByIdAndRemove(categoryId);
    await Product.updateMany(
      { category: categoryToDelete._id },
      { category: null }
    );
    return res.status(200).json(deletedCategory);
  } catch (err) {
    return res.status(500).json({ message: "Error for delete the category" });
  }
};

exports.getCategories = getCategories;
exports.getCategoryById = getCategoryById;
exports.addCategory = addCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
