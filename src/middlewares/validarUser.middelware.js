const Usuario = require('../models/usuarios.models');

const validarUser = async (req, res, next) => {
    const { user } = req.body;
    const usuario = await Usuario.findOne({ user });
    if (usuario) {
        res.status(401).json("EL nombre de usuario ya está siendo utilizado");
    } else {
        next();
    }
}

module.exports = validarUser;