const express = require('express');
const app = express();
require("./middleware")(app);
require("./routes")(app);
require("../middleware/global/error_handler")(app);

module.exports = app;