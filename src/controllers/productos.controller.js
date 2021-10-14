require('dotenv').config();
const Producto = require('../models/productos.models');
const productoJoi = require('../Schemas/productos.joi');
const redis = require('redis');



//Cache get productos
const clienteRedis = redis.createClient(process.env.redis);

const cache = (req, res, next) => {
    clienteRedis.get('prodocutos', (err, respuesta) => {
        if (err) throw err;

        if (respuesta) {
            res.json(JSON.parse(respuesta))
        } else {
            next();
        }
    });

};


// controlador Get
const getProductos = async (req, res) => {
    const respuesta = await Producto.find();
    clienteRedis.setex('prodocutos', 60*10 , JSON.stringify(respuesta))
    res.json(respuesta);
};



//controlador Post

const postProductos = async (req, res) => {
    try {
        const { name, price } = await productoJoi.validateAsync(req.body);
        const producto = new Producto({ name, price });
        await producto.save();
        const respuesta = await Producto.find();
        clienteRedis.setex('prodocutos', 60*5, JSON.stringify(respuesta))
        res.json('Producto agregado correctamente');
    } catch (error) {
        console.log(error.details[0].message);
        res.json(error.details[0].message)
    }

};

//controlador Put


const putProductos = async (req, res) => {
    try {
        const { _id } = req.params;
        const { name, price } = await productoJoi.validateAsync(req.body);
        const productoActualizar = await Producto.findById({_id});
        if (productoActualizar) {
            productoActualizar.name = name;
            productoActualizar.price = price;
            await productoActualizar.save();
            const respuesta = await Producto.find();
            clienteRedis.setex('prodocutos', 60*5, JSON.stringify(respuesta))
            res.status(201).json('Producto actualizado correctamente');
        } else {
            res.json("No existe un producto registrado con este id")
        }
    } catch (error) {
        res.json(error.details[0].message)
    }
};

// controlador delete

const delProductos = async (req, res) => {
    try {
        const { _id } = req.params;
        const result = await Producto.findByIdAndDelete({_id});
        const respuesta = await Producto.find();
        clienteRedis.setex('prodocutos', 60*5, JSON.stringify(respuesta))
        if (result) {
            res.json('Producto borrado correctamente');
        } else {
            res.json('No hay producto registrado con este id')
        }
    } catch (error) {
        res.json('No hay producto registrado con este id')
    }

};

module.exports = { getProductos, postProductos, putProductos, delProductos, cache }