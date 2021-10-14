const Joi = require('joi');

const productoJoi = Joi.object({
    name: Joi.string()
        .required(),
    price: Joi.number()
        .required()
});

module.exports = productoJoi;