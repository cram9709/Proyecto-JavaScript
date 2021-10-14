const Producto = require('../models/productos.models');
const Pedido = require('../models/pedidos.models');
const estados = require('../clases/clase.metodoPago');
const pedidoJoi = require('../Schemas/pedido.joi');



const geTpedido = async (req, res) => {
    try {
        const { user, isAdmin } = req.auth;
        if (isAdmin === true) {
            const pedidos = await Pedido.find()
            res.json(pedidos);
        } else {
            const pedidosUser = await Pedido.find({ user })
            if (pedidosUser) {
                res.json(pedidosUser);
            } else { res.json("Usted no tiene pedidos"); }
        };
    } catch (error) {
        console.log(error);
    }
};

const postPedido = async (req, res) => {
    try {
        const { user, names, telf, email } = req.auth;
        const { productos, address, formaPago } = await pedidoJoi.validateAsync(req.body);

        let arrayProductos = [];
        let precio = 0;
        for (let i = 0; i < productos.length; i++) {
            const producto1 = productos[i];
            const producto2 = producto1[0];
            const cantidad = producto1[1];
            const AggProducto = await Producto.findOne({ name: producto2 });
            for (let i = 0; i < cantidad ; i++) {
                arrayProductos.push(AggProducto);  
            };
            precio = precio + AggProducto.price*cantidad;
        };
        const pedido1 = new Pedido({ user, name: names, productos: arrayProductos, telf, email, address, precioTotal: precio, formaPago });
        await pedido1.save();
        res.json('Pedido pendiente, para confirmar cierre pedido en actualizar. El id de su pedido es: ' + (pedido1._id));

    } catch (error) {
        res.json(error.details[0].message)
    }
};


const putPedido = async (req, res) => {
    try {
        const { isAdmin } = req.auth;
        if (isAdmin === true) {
            res.status(401).json('Usted es Administrador Utilice /admin');
        } else {
            const { _id } = req.params;
            const { productos, estadoPedido } = req.body;
            const pedido = await Pedido.findById({ _id })
            if (pedido) {
                if (pedido.estadoPedido !== 'Pendiente') {
                    res.status(401).json('El pedido ya esta cerrado');
                } else {
                    let arrayProductos = [];
                    let precio = 0;
                    for (let i = 0; i < productos.length; i++) {
                        const producto1 = productos[i];
                        const producto2 = producto1[0];
                        const cantidad = producto1[1];
                        const AggProducto = await Producto.findOne({ name: producto2 });
                        for (let i = 0; i < cantidad ; i++) {
                            arrayProductos.push(AggProducto);  
                        };
                        precio = precio + AggProducto.price*cantidad;
                    };
                    pedido.productos = arrayProductos;
                    pedido.precioTotal = precio;
                    pedido.estadoPedido = estadoPedido;
                    await pedido.save();
                    res.json('Su pedido ha sido actualizado y está en camino');
                };
            } else {
                res.json("No existe un pedido con este id")
            }
        };
    } catch (error) {
        console.log(error);
    }
};

const putAdminPedido = async (req, res) => {
    try {
        const { isAdmin } = req.auth;
        if (isAdmin === true) {
            const { _id } = req.params;
            const { estadoPedido } = req.body;
            const siEstado = estados.find(e => e == estadoPedido);
            if (siEstado) {
                const pedido = await Pedido.findById({ _id });
                pedido.estadoPedido = estadoPedido;
                await pedido.save();
                res.status(201).json("El estado del pedido ha cambiado")
            } else { res.status(401).json('Asigne un estado disponible') };
        } else {
            res.status(401).json('No esta autorizado');
        }

    } catch (error) {
        console.log(error);
    }
};

module.exports = { geTpedido, postPedido, putPedido, putAdminPedido }
