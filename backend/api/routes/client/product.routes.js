const express = require("express");
const { isAuthenticate } = require("../../policies/authMiddleware");
const productValidation = require("../../helpers/utils/validations/product");
const routes = express.Router();
const validate = require("../../policies/validate");
const productController = require("../../controllers/client/product.controller");

routes.post(
  "/create",
  isAuthenticate,
  validate(productValidation.createProduct),
  productController.createProduct
);

routes.get("/:productId", isAuthenticate, productController.getProductById);

routes.post("/all", isAuthenticate, productController.getAllProduct);

routes.put(
  "/update/:productId",
  isAuthenticate,
  productController.updateProduct
);

routes.delete(
  "/delete/:productId",
  isAuthenticate,
  productController.deleteProduct
);

module.exports = routes;
