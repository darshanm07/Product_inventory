const Joi = require("joi")

const register = new Joi.object({
    name : Joi.string().optional(),
    email : Joi.string().email().required(),
    password : Joi.string().required(),
})

const login = new Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().required(),
})

module.exports = {
    login,register
}