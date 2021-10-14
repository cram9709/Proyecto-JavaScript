const MetodoPago = require('../models/metodoPago.models');
const metodoPagoJoi = require('../Schemas/metodoPago.joi');

// controlador get pago

const getPago = async (req, res) => {
    const metodosPago = await MetodoPago.find();
    res.json(metodosPago);
};

const postPago = async (req, res) => {
    try {
        const { formaPago } = await metodoPagoJoi.validateAsync(req.body);
        const metodoPago = new MetodoPago({ formaPago });
        await metodoPago.save();
        res.json("Nuevo Metodo de pago agregado");
    } catch (error) {
        res.json(error.details[0].message)
        console.log(error);
    }
};

const putPago = async (req, res) => {
    try {
        const { _id } = req.params
        const { formaPago } = await metodoPagoJoi.validateAsync(req.body);
        const metodoPagoActualizar = await MetodoPago.findById(_id);
        if (metodoPagoActualizar) {   
            metodoPagoActualizar.formaPago = formaPago;
            await metodoPagoActualizar.save();
            res.json('Actualizado');
        } else {
            res.json("No existe un metodo de pago registrado con ese id");
        }
    } catch (error) {
        console.log(error.details[0].message);
        res.json(error.details[0].message)
    }
};

const delPago = async (req, res) => {
    try {
        const { _id } = req.params
        const result = await MetodoPago.findByIdAndDelete(_id);
        if (result) {
            res.json('Metodo de pago borrado');
        } else{
            res.json("No existe un metodo de pago registrado con ese id")
        }
    } catch (error) {
        console.log(error);
        res.json("No existe un metodo de pago registrado con ese id")
    }
};

module.exports = { getPago, postPago, putPago, delPago }