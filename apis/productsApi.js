//create mini-express app
const exp = require("express");
const productApp = exp.Router();

//body parser
productApp.use(exp.json());

//local data
let productsList = [];

//Product routes
productApp.get("/products", (req, res) => {
  res.send({ message: "all products", payload: productsList });
});

//export
module.exports = productApp
