const Joi = require('joi');

const usuarioJoi = Joi.object({
    user: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    names: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    telf: Joi.string()
        .min(3)
        .max(30)
        .required(),
    agendaDirecciones: Joi.object(),
    pass: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_pass: Joi.ref('pass'),
    isAdmin: Joi.boolean(),
    isActivo: Joi.boolean(),
})
    .with('pass', 'repeat_pass');

module.exports = usuarioJoi;