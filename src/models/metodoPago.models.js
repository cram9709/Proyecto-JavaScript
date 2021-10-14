const mongoose = require('mongoose');

const metodoPagoSchema = new mongoose.Schema({
    formaPago:{
        type: String,
        required: true
    }
});

const metodoPago = [
    {
        id: 0,
        formaPago:"Efectivo",
    },
    {
        id: 1,
        formaPago:"Bit Coin",
    },
    {
        id: 2,
        formaPago:"Datafono",
    },
    {
        id: 3,
        formaPago:"Nequi",
    }
]



module.exports =  mongoose.model('MetodoPago',metodoPagoSchema)