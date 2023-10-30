const mongoose = require("mongoose");

const URI_MONGODB = "mongodb://127.0.0.1/store";

mongoose
  .connect(URI_MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => console.log("Data base connected"))
  .catch((err) => console.log("Couldn't connect to the data base"));
