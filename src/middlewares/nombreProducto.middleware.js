const Producto = require('../models/productos.models');

const nombreProducto = async (req, res, next) => {
    const { productos } = req.body;

    bandera = true;
    for (let i = 0; i < productos.length; i++) {
        const producto1 = productos[i];
        const cantidad = producto1[0];
        const productoEsta = await Producto.findOne({name: cantidad});
        if (productoEsta) {
            bandera = true;
        } else {
            bandera = false;
            break;
        }
    }

    if (bandera) {
        next();
    } else {
        res.json("Hay un nombre de producto mal escrito o incorrecto")
    }
};

module.exports = { nombreProducto };