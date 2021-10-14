require('dotenv').config();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarios.models');
const JWT = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { user, pass } = req.body;

        const {
            _id,
            names,
            email,
            pass: passUsuario,
            telf,
            isAdmin,
            isActivo
        } = await Usuario.findOne({ user });

        if (isActivo) {
            const resultado = bcrypt.compareSync(pass, passUsuario);
            if (resultado) {

                const token = JWT.sign({
                    _id,
                    user,
                    names,
                    email,
                    telf,
                    isAdmin,
                    isActivo
                }, process.env.secret)

                res.status(201).json("Usuario logeado, utilice este token: " + token);

            } else {
                res.json('Usuario o contraseña incorrecta');
            }
        }else{
            res.json("Este usuario ha sido dado de baja");
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = login