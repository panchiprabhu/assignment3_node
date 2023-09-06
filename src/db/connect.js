const mongoose = require("mongoose");
const logger = require("../logger/log");

mongoose
  .connect("mongodb://127.0.0.1:27017/users-api")
  .then(() => {
    logger.info("Connected to Mongo Successfully!");
  })
  .catch((err) => {
    logger.error("Error connecting to mongo!");
  });
