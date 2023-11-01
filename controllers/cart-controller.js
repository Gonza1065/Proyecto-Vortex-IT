// Importing the models
const Cart = require("../models/cart");
const Product = require("../models/product");

// http://localhost:5000/api/cart/ <- URL where the function is executed
const viewCart = async (req, res, next) => {
  const productsInCart = await Cart.find().populate("productId");
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
  let acc = 0;
  try {
    const productsInCart = await Cart.find();
    if (productsInCart <= 0) {
      return res
        .status(404)
        .json({ message: "There aren't products in the cart to count" });
    }
    productsInCart.forEach((product) => (acc += 1));
    return res
      .status(200)
      .json({ message: `There are ${acc} products in the cart` });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error for see the quantity to cart" });
  }
};

// http://localhost:5000/api/cart/price-total <- URL where the function is executed
const viewPriceTotal = async (req, res, next) => {
  try {
    const productsInCart = await Cart.find().populate("productId");
    if (productsInCart.length <= 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }
    let priceTotal = 0;
    productsInCart.forEach((cartItem) => {
      const product = cartItem.productId;
      const quantity = cartItem.quantity;
      const productPrice = product.price;
      priceTotal += productPrice * quantity;
    });
    return res.status(200).json({ Total: `$${priceTotal}` });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// http://localhost:5000/api/cart/add-product-cart/ <- URL where the function is executed
const addProductToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  try {
    const existingCartItem = await Cart.findOne({ productId: productId });
    if (existingCartItem) {
      return res
        .status(409)
        .json({ message: "Product already exists in the cart" });
    }
    const existingProduct = await Product.findOne({ _id: productId });
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found in the DB" });
    }
    const newProductInCart = new Cart({
      productId,
      quantity,
    });
    await newProductInCart.save();
    return res.status(201).json(newProductInCart);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// http://localhost:5000/api/cart/update-product-cart/:id <- URL where the function is executed
const updateProductToCart = async (req, res, next) => {
  const productId = req.params.id;
  const updateData = req.body;
  try {
    const productInCart = await Cart.find({ productId: productId });
    if (productInCart) {
      const updatedProductInCart = await Cart.findByIdAndUpdate(
        productId,
        updateData,
        { new: true }
      );
      return res.status(201).json(updatedProductInCart);
    } else {
      return res
        .status(404)
        .json({ message: "Don't exist the product in cart" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error to update the product in the cart" });
  }
};

// http://localhost:5000/api/cart/delete-product-cart/:id <- URL where the function is executed
const deleteProductToCart = async (req, res, next) => {
  const cartId = req.params.id;
  try {
    const existingProductInCart = await Cart.findOne({ _id: cartId });
    if (existingProductInCart) {
      const deletedProduct = await Cart.findByIdAndRemove(cartId);
      return res.status(200).json(deletedProduct);
    } else {
      return res
        .status(404)
        .json({ message: "Couldn't find the product in the cart" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error for find the product in the cart" });
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
