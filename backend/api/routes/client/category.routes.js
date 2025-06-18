const express = require("express");
const { isAuthenticate } = require("../../policies/authMiddleware");
const routes = express.Router();
const categoryController = require("../../controllers/client/category.controller");

routes.get("/all", isAuthenticate, categoryController.getAllCategory);

module.exports = routes;
