// const mongoose = require('mongoose');
var express = require("express");
var app = express();
var routes = require("./routes");
const port = 3000;
require("dotenv").config();

// respond with "hello world" when a GET request is made to the homepage

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Import my test routes into the path '/routes'
app.use("/", routes);
