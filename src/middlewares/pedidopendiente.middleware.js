const  Pedidos  = require('../models/pedidos.models')

const pedidoPendiente = async (req, res, next) => {
    const { user }= req.auth;
    const pedidos = await Pedidos.find({ user });
    const pedidoPendiente =  pedidos.find(pedido => pedido.estadoPedido === "Pendiente")
    if (pedidoPendiente) {
        res.status(401).json("Usted tiene un pedido pendiente, debe confirmalo para realizar mas pedidos");
    } else {
        next();
    }
}

module.exports = pedidoPendiente;