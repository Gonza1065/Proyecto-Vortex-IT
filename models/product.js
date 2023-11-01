// Importing mongoose for create to Schema
const mongoose = require("mongoose");

// Creating Schema for the Product
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Creating the model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
