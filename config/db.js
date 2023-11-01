// Importing mongoose for create the conexion with my DB
const mongoose = require("mongoose");

// Creating variable for my URI
const URI_MONGODB = "mongodb://127.0.0.1/store";

// Connecting of MongoDB Compass with my URI
mongoose
  .connect(URI_MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => console.log("Data base connected"))
  .catch((err) => console.log("Couldn't connect to the data base"));
