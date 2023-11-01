// Importing mongoose for create to Schema
const mongoose = require("mongoose");

// Creating Schema for the Category
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// Creating the model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
