const Usuario = require('../models/usuarios.models');

const bcrypt = require('bcrypt');

const usuarioJoi = require('../Schemas/usuario.joi');
const userActivo = require('../Schemas/userActivo.joi');

//Controlador get 

const getRegistro = async (req, res) => {
    try {
        const allUsuarios = await Usuario.find();
        res.json(allUsuarios);
    } catch (error) {
        console.log(error);
    }
};

// Controlador post

const postRegistro = async (req, res) => {
    try {
        const { user, names, email, telf, agendaDirecciones, pass } = await usuarioJoi.validateAsync(req.body);
        const usuario = new Usuario({
            user,
            names,
            email,
            telf,
            agendaDirecciones,
            pass: bcrypt.hashSync(pass, 10)
        });
        await usuario.save();
        res.json('Usuario agregado correctamente');
    } catch (error) {
        console.log(error.details[0].message);
        res.status(404).json(error.details[0].message);
    }
};

// controlador put

const putRegistro = async (req, res) => {
    try {
        const { _id } = req.params;
        const { isActivo } = await userActivo.validateAsync(req.body);
        const usuario = await Usuario.findById(_id);
        if (usuario) {
            usuario.isActivo = isActivo;
            await usuario.save();
            res.json("El modulo usuario activo ha sido actualizado");
        } else {
            res.json("No existe un usuario con este id");
        }
    } catch (error) {
        console.log(error);
        res.json(error.details[0].message);
    }
};


module.exports = { getRegistro, postRegistro, putRegistro }