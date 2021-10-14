const Joi = require('joi');

const metodoPagoJoi = Joi.object({
    formaPago: Joi.string()
        .required()
});

module.exports = metodoPagoJoi;