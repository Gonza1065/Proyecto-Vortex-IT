const express = require("express");
const app = express();

// Initializing to data base
require("./config/db");

// Declaring the routes (products, categories, cart)
const productsRoutes = require("./routes/products-routes");
const categoriesRoutes = require("./routes/category-routes");
const cartRoutes = require("./routes/cart-routes");

// Middlewares for analyze request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Creating and using the routes
app.use("/api/products", productsRoutes);
app.use("/api/category", categoriesRoutes);
app.use("/api/cart", cartRoutes);
app.listen(5000);
