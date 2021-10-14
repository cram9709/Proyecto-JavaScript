const Usuario = require('../models/usuarios.models');

const validarEmail = async (req, res, next) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (usuario) {
        res.status(401).json("Ya hay un usuario registrado con este email");
    } else {
        next();
    }
}

module.exports = validarEmail;