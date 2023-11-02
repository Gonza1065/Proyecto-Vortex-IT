// Importing mongoose for create to Schema
const mongoose = require("mongoose");

// Creating Schema for the Cart
const cartSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
});

// Creating the model
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
