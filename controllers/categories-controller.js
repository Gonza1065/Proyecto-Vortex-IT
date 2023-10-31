const Category = require("../models/category");
const Product = require("../models/product");
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (categories) {
      return res.status(200).json(categories);
    } else {
      return res.status(404).json({ message: "Couldn't find the categories" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Server error for find the categories" });
  }
};

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
    console.log(err);
    return res
      .status(500)
      .json({ message: "Server error for find the category" });
  }
};

const addCategory = async (req, res, next) => {
  const { name } = req.body;

  try {
    const existingCategory = await Product.findOne({ category: name });
    if (existingCategory) {
      return res.status(409).json({
        message: "Couldn't add the category because already exist",
      });
    } else {
      const newCategory = new Category({ name });
      await newCategory.save();
      return res.status(200).json(newCategory);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error to the add the category" });
  }
};

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
    console.log(err);
    return res.status(500).json({ message: "Error updating the category" });
  }
};

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
    console.log(err);
    return res.status(500).json({ message: "Error for delete the category" });
  }
};

exports.getCategories = getCategories;
exports.getCategoryById = getCategoryById;
exports.addCategory = addCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
