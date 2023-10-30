const express = require("express");
const app = express();

require("./config/db");

const productsRoutes = require("./routes/products-routes");
const categoriesRoutes = require("./routes/category-routes");
const cartRoutes = require("./routes/cart-routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRoutes);
app.use("/api/category", categoriesRoutes);
app.use("/api/cart", cartRoutes);
app.listen(5000);
