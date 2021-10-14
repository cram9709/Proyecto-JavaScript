const Joi = require('joi');

const userActivo = Joi.object({
    isActivo: Joi.boolean()
});

module.exports = userActivo;