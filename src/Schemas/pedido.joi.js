const Joi = require('joi');

const pedidoJoi = Joi.object({
    productos: Joi.array()
        .required(),
    address: Joi.string()
        .required(),
    formaPago: Joi.string()
        .required()
});

module.exports = pedidoJoi;