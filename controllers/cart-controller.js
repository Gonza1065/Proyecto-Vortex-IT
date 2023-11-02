// Importing the models
const Cart = require("../models/cart");
const Product = require("../models/product");

// http://localhost:5000/api/cart/ <- URL where the function is executed
const viewCart = async (req, res, next) => {
  const productsInCart = await Cart.find().populate({
    path: "items.productId",
    populate: { path: "category" },
  });
  try {
    if (productsInCart.length > 0) {
      return res.status(200).json(productsInCart);
    } else {
      return res
        .status(404)
        .json({ message: "There aren't products in the cart" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error to the find the products" });
  }
};

// http://localhost:5000/api/cart/quantity-products <- URL where the function is executed
const viewCartQuantity = async (req, res, next) => {
  try {
    const existingCart = await Cart.findOne();
    if (!existingCart) {
      return res.status(404).json({ message: "The cart is empty" });
    }
    const totalQuantity = existingCart.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    return res
      .status(200)
      .json({ message: `There are ${totalQuantity} products in the cart` });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Error retrieving the cart quantity" });
  }
};

// http://localhost:5000/api/cart/price-total <- URL where the function is executed
const viewPriceTotal = async (req, res, next) => {
  try {
    const existingCart = await Cart.findOne();
    if (!existingCart) {
      return res.status(404).json({ message: "Cart is empty" });
    }
    let priceTotal = 0;
    for (const item of existingCart.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        const quantity = item.quantity;
        const productPrice = product.price;
        priceTotal += productPrice * quantity;
      }
    }

    return res.status(200).json({ Total: `$${priceTotal}` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error for view price total" });
  }
};

// http://localhost:5000/api/cart/add-product-cart/ <- URL where the function is executed
const addProductToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  try {
    const existingCart = await Cart.findOne();
    if (!existingCart) {
      const newCart = new Cart({
        items: [{ productId, quantity }],
      });
      await newCart.save();
      return res.status(201).json(newCart);
    } else {
      const existingItemIndex = existingCart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (existingItemIndex !== -1) {
        existingCart.items[existingItemIndex].quantity += quantity;
      } else {
        existingCart.items.push({ productId, quantity });
      }
      await existingCart.save();
      return res.status(200).json(existingCart);
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error to the add product to cart" });
  }
};

// http://localhost:5000/api/cart/update-product-cart/:id <- URL where the function is executed
const updateProductToCart = async (req, res, next) => {
  const productId = req.params.id;
  const updateData = req.body;
  try {
    const existingCart = await Cart.findOne();
    if (existingCart) {
      const existingItem = existingCart.items.find(
        (item) => item.productId.toString() === productId
      );
      if (existingItem) {
        existingItem.quantity = updateData.quantity;
        await existingCart.save();
        return res.status(200).json(existingCart);
      } else {
        return res
          .status(404)
          .json({ message: "Product not found in the cart" });
      }
    } else {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error updating the product in the cart" });
  }
};

// http://localhost:5000/api/cart/delete-product-cart/:id <- URL where the function is executed
const deleteProductToCart = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const existingCart = await Cart.findOne();
    if (existingCart) {
      const existingItemIndex = existingCart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (existingItemIndex !== -1) {
        existingCart.items.splice(existingItemIndex, 1);
        await existingCart.save();
        return res.status(200).json(existingCart);
      } else {
        return res
          .status(404)
          .json({ message: "Product not found in the cart" });
      }
    } else {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error deleting the product from the cart" });
  }
};

// http://localhost:5000/api/cart/delete-cart/ <- URL where the function is executed
const deleteCart = async (req, res, next) => {
  try {
    const productsInCart = await Cart.find();
    if (productsInCart.length < 0) {
      return res
        .status(404)
        .json({ message: "There aren't products for delete" });
    }
    await Cart.deleteMany({});
    return res.status(201).json({ message: "All the products was deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Error for delete cart" });
  }
};

exports.viewCart = viewCart;
exports.viewCartQuantity = viewCartQuantity;
exports.viewPriceTotal = viewPriceTotal;
exports.addProductToCart = addProductToCart;
exports.updateProductToCart = updateProductToCart;
exports.deleteProductToCart = deleteProductToCart;
exports.deleteCart = deleteCart;
