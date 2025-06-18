const express = require("express");
const routes = express.Router();
const userValidation = require("../../helpers/utils/validations/auth");
const validate = require("../../policies/validate");
const authController = require("../../controllers/client/auth.controller");

routes.post(
  "/register",
  validate(userValidation.register),
  authController.register
);

routes.post("/login", validate(userValidation.login), authController.login);

module.exports = routes;
