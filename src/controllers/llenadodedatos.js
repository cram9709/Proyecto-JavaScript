const Usuario = require('../models/usuarios.models');
const MetodoPago = require('../models/metodoPago.models');
const Producto = require('../models/productos.models');
const Pedido = require('../models/pedidos.models');
const bcrypt = require('bcrypt');

const llenadoDatosIniciales = async () => {


    //Llenado usuarios
    const usuarios = await Usuario.find();
    if (usuarios.length > 0) {
        console.log("Los usuarios ya estan creados");

    } else {
        const admin = new Usuario({
            _id: "6145407bd17122b8283b0855",
            user: "admin",
            names: "admin admin",
            telf: "101010",
            email: "admin@tienda.com",
            agendaDirecciones: { direccion: "calle 10, crr 10" },
            pass: bcrypt.hashSync("12345", 10),
            isAdmin: true,
            isActivo: true
        });
        await admin.save()


        const user1 = new Usuario({
            _id: "6145407bd17122b8283b0858",
            user: "usuario",
            names: "usuario usuario",
            telf: "202020",
            email: "usuario@tienda.com",
            agendaDirecciones: { direccion: "calle 20, crr 20" },
            pass: bcrypt.hashSync("12345", 10),
        });
        await user1.save()


        const user2 = new Usuario({
            _id: "6145407bd17122b8283b085b",
            user: "parapedido",
            names: "funciono pedido",
            telf: "202020",
            email: "pedidosifunciona@tienda.com",
            agendaDirecciones: { direccion: "calle 20, crr 20" },
            pass: bcrypt.hashSync("12345", 10),
        });
        await user2.save()
        console.log("Usuarios de prueba y administrador agregados");

    };

    //Llenado productos

    const productos = await Producto.find();
    if (productos.length > 0) {
        console.log("Los productos ya estan creados");

    } else {
        const salchipapa = new Producto({
            _id: "6145407bd17122b8283b085f",
            name: "Salchipapa",
            price: 10000
        });
        await salchipapa.save()

        const picada = new Producto({
            _id: "6145407bd17122b8283b0861",
            name: "Picada",
            price: 12000
        });
        await picada.save()

        const parrillada = new Producto({
            _id: "6145407bd17122b8283b0863",
            name: "Parrillada",
            price: 15000
        });
        await parrillada.save()

        const chuleta = new Producto({
            _id: "6145407bd17122b8283b0865",
            name: "Chuleta",
            price: 15000
        });
        await chuleta.save()

        const churazco = new Producto({
            _id: "6145407bd17122b8283b0867",
            name: "Churazco",
            price: 15000,
        });
        await churazco.save()

        const coca = new Producto({
            _id: "6145407bd17122b8283b0869",
            name: "Coca Cola 500ml",
            price: 2000
        });
        await coca.save()

        const postobon = new Producto({
            _id: "6145407bd17122b8283b086b",
            name: "Postobon 500ml",
            price: 2000
        });
        await postobon.save()

        console.log("Productos agregados");
    };

    //Llenado de productos

    const pedidos = await Pedido.find();
    if (pedidos.length > 0) {
        console.log("Los pedidos ya estan creados");

    } else {
        const adminPedido = new Pedido({
            _id: "61454a0154f1755aac9a5cc1",
            user: "admin",
            name: "admin admin",
            productos: [{
                _id: "6145407bd17122b8283b0865",
                name: "Chuleta",
                price: 15000
            }, {
                _id: "6145407bd17122b8283b0869",
                name: "Coca Cola 500ml",
                price: 2000
            }],
            telf: "30138484",
            email: "admin@tienda.com",
            address: "calle",
            precioTotal: 17000,
            estadoPedido: "Entregado",
            formaPago: "Fiado"

        });
        await adminPedido.save()


        const usuarioPedido = new Pedido({
            _id: "61454a0154f1755aac9a5cc5",
            user: 'usuario',
            name: 'usuario usuario',
            productos: [{
                _id: "6145407bd17122b8283b0865",
                name: "Chuleta",
                price: 15000
            },
            {
                _id: "6145407bd17122b8283b0869",
                name: "Coca Cola 500ml",
                price: 2000
            },
            {
                _id: "6145407bd17122b8283b0865",
                name: "Chuleta",
                price: 15000
            }],
            telf: '2494859',
            email: 'usuario@tienda.com',
            address: 'calle223',
            precioTotal: 32000,
            estadoPedido: 'Enviado',
            formaPago: 'Efectivo'
        });
        await usuarioPedido.save()

        console.log("Pedidos agregados");
    };

    // llendo metodos de pago

    const pago = await MetodoPago.find();
    if (pago.length > 0) {
        console.log("Los productos ya estan creados");

    } else {
        const efectivo = new MetodoPago({
            _id: "614550cdcf3b0d89faf10191",
            formaPago:"Efectivo"
        });
        await efectivo.save()

        const cripto = new MetodoPago({
            _id: "614550cdcf3b0d89faf10193",
            formaPago:"Bit Coin"
        });
        await cripto.save()

        const targeta = new MetodoPago({
            _id: "614550cdcf3b0d89faf10195",
            formaPago:"Datafono"
        });
        await targeta.save()

        const tranferencia = new MetodoPago({
            _id:"614550cdcf3b0d89faf10197",
            formaPago:"Nequi"
        });
        await tranferencia.save()
        
        console.log("Metodos de pago agregados");
    };

}

    


module.exports = llenadoDatosIniciales;