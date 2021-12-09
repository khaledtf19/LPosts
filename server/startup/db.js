const mongoose = require("mongoose");
require("dotenv").config({ path: "../config/config.env" });

const connectionString = process.env.ATLAS_URI;

module.exports = function () {
  mongoose.connect(connectionString).then(() => {
    console.log("Connected to the DB");
  });
};
