const validarCantidad = (req, res, next) => {
    const { productos } = req.body;

    bandera = true;
    for (let i = 0; i < productos.length; i++) {
        const producto1 = productos[i];
        const cantidad = producto1[1];
        if (cantidad) {
            bandera = true;
        } else {
            bandera = false;
            break;
        }
    }

    if (bandera) {
        next();
    } else {
        res.json("Todos los producto deben tener Cantidad")
    }
};

module.exports = { validarCantidad };



