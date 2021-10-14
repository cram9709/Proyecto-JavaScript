const mongoose = require('mongoose');

const direccionesSchema = new mongoose.Schema({
    direccion: {
        type: String,
        required: true
    }
})

const usuarioSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    names: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telf: {
        type: String,
        required: true
    },
    agendaDirecciones: {
        type: [direccionesSchema],
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActivo: {
        type: Boolean,
        default: true
    }
});



module.exports = mongoose.model('Usuario', usuarioSchema)