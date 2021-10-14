require('dotenv').config();
const mongoose = require('mongoose');
const Usuario = require('./models/usuarios.models');
const MetodoPago = require('./models/metodoPago.models');
const Producto = require('./models/productos.models');
const Pedido = require('./models/pedidos.models');

(async () => {
    const db= await mongoose.connect(process.env.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("you´re conectc");
    // llenadoDatosIniciales();

    


})();