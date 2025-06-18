const Joi = require("joi");

const nameSchema = Joi.string().required();
const descriptionSchema = Joi.string().optional();
const quantitySchema = Joi.string().optional();
const categoriesSchema = Joi.string().optional();

const createProduct = new Joi.object({
  name: nameSchema,
  description: descriptionSchema,
  quantity: quantitySchema,
  categories: categoriesSchema,
  createdBy: Joi.string().optional(),
});

module.exports = {
  createProduct,
};
