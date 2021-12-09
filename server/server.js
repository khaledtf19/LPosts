const express = require("express");
const app = express();
var cors = require("cors");
const error = require("./middleware/error");
require("dotenv").config({ path: "config/config.env" });
app.use(cors());

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/prod")(app);

// Error handle
app.use(error);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`REST API on http://localhost:${PORT}`);
});
