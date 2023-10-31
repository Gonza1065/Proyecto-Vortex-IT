const Product = require("../models/product");
const Category = require("../models/category");
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: "Couldn't find the products" });
    console.log(err);
  }
};

const getProductsByCategory = async (req, res, next) => {
  const productCategory = req.params.category;

  try {
    const productsByCategory = await Product.find({
      category: productCategory,
    });
    return res.status(201).json(productsByCategory);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Products by category not found" });
  }
};

const getProductById = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Couldn't find the product by ID" });
  }
};

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
    console.log(err);
    return res.status(500).json({ message: "Error couldn't add the product" });
  }
};

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
      res.status(200).json(updatedProduct);
    } else {
      res
        .status(404)
        .json({ message: "Couldn't find the product for update it" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error for update the product" });
  }
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndRemove(productId);
    if (deletedProduct) {
      return res.status(200).json(deletedProduct);
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
