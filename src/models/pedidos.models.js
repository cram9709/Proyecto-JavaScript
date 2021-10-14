const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    }
});


const pedidoSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    productos: {
        type: [productoSchema],
        required: true
    },
    telf: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    precioTotal: {
        type: Number,
        default : 0
    },
    estadoPedido:{
        type: String,
        default: 'Pendiente'
    },
    formaPago: {
        type: String,
        required: true
    }
});

module.exports =  mongoose.model('Pedidos', pedidoSchema)





