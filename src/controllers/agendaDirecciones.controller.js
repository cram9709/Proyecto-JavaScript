const Usuario = require('../models/usuarios.models');


const getDirecciones = async (req, res) => {
    try {
        const { _id } = req.auth;
        const usuario = await Usuario.findById({ _id });
        const agenda = usuario.agendaDirecciones;
        res.json(agenda);
    } catch (error) {
        console.log(error);
    }
};

const putDirecciones = async (req, res) => {
    try {
        const nuevaDireccion = req.body;
        const { _id } = req.auth;
        const usuario = await Usuario.findById({ _id });
        usuario.agendaDirecciones.push(nuevaDireccion);
        usuario.save()
        res.json("Su agenda ha sido actualizada");
    } catch (error) {
        console.log(error);
    }

}


module.exports = { getDirecciones, putDirecciones };