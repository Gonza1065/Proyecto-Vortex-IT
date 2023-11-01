// Importing the models
const Product = require("../models/product");
const Category = require("../models/category");

// http://localhost:5000/api/products <- URL where the function is executed
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category");
    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({ message: "Couldn't find the products" });
  }
};

// http://localhost:5000/api/products/category/:category <- URL where the function is executed
const getProductsByCategory = async (req, res, next) => {
  const productCategory = req.params.category;
  try {
    const productsByCategory = await Product.find({
      category: productCategory,
    }).populate("category");
    return res.status(200).json(productsByCategory);
  } catch (err) {
    return res.status(404).json({ message: "Products by category not found" });
  }
};

// http://localhost:5000/api/products/:id <- URL where the function is executed
const getProductById = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId).populate("category");
    return res.status(200).json(product);
  } catch (err) {
    return res.status(404).json({ message: "Couldn't find the product by ID" });
  }
};

// http://localhost:5000/api/products/add-product <- URL where the function is executed
const addProduct = async (req, res, next) => {
  const { title, description, category, price } = req.body;
  try {
    const categoryDocument = await Category.findOne({ name: category });
    if (categoryDocument) {
      const categoryId = categoryDocument._id;
      const newProduct = new Product({
        title,
        description,
        category: categoryId,
        price,
      });
      await newProduct.save();
      return res.status(201).json(newProduct);
    } else {
      return res.status(404).json({ message: "Category not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error couldn't add the product" });
  }
};

// http://localhost:5000/api/products/update-product/:id <- URL where the function is executed
const updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  const updateData = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );
    if (updatedProduct) {
      return res.status(201).json(updatedProduct);
    } else {
      return res
        .status(404)
        .json({ message: "Couldn't find the product for update it" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error for update the product" });
  }
};

// http://localhost:5000/api/products/delete-product/:id <- URL where the function is executed
const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndRemove(productId);
    if (deletedProduct) {
      return res.status(202).json(deletedProduct);
    } else {
      return res.status(404).json({ message: "Product not found for delete" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error for delete the product" });
  }
};

exports.getProducts = getProducts;
exports.getProductsByCategory = getProductsByCategory;
exports.getProductById = getProductById;
exports.addProduct = addProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
