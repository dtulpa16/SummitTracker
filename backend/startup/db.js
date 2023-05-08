const mongoose = require("mongoose");
require('dotenv').config()

function connectDb() {
  mongoose
    .connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => {
      console.log(`Could not connect to MongoDB. ERROR ${err}`);
      process.exit(1);
    });
}
module.exports = connectDb;