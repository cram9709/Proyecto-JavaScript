const express = require('express');
const router = express.Router();


const { idValido } = require('../middlewares/validarIndex.middleware');
const { getPago, postPago, putPago, delPago } = require('../controllers/metodoPago.controller')
const { isAdmin } = require('../middlewares/isAdmin.middelware');



/**
 * @swagger
 * /metodosPago:
 *  get: 
 *      summary: Obtener todos los usuarios del sistema
 *      tags: [MetodosPago]
 *      responses:
 *          200:
 *              description: "Todos los Metodos de Pago"
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: array 
 *                          items:
 *                              $ref: "#/components/schemas/metodoPago"
 */

router.get('/', getPago);

/**
 * @swagger
 * /metodosPago:
 *  post: 
 *      summary: Agrega un nuevo Metodo de Pago al sistema
 *      tags: [MetodosPago]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/metodoPago"
 *      responses:
 *          201:
 *              description: Metodo de Pago Agregado correctamente 
 *          401: 
 *              description: Usted no esta autorizado - No se permiten Metodos de pago con el mismo id
 * 
 */

router.post('/', isAdmin, postPago);

/**
 * @swagger
 * /metodosPago/{_id}:
 *  put: 
 *      summary: Actualizar un Metodo
 *      operationId: ActualizarMetodo
 *      tags: [MetodosPago]
 *      parameters:
 *        - in: path
 *          name: _id
 *          description: Envie el id del metodo a modificar
 *          required: true
 *          schema:
 *              type: string
 *              format: _id
 *              example: 614550cdcf3b0d89faf10193
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/metodoPut"
 *      responses:
 *          201:
 *              description: Producto Actualizado correctamente 
 *          401: 
 *              description: Usted no esta autorizado - No existe un producto con este id
 * 
 */
router.put('/:_id', isAdmin, idValido, putPago);
/**
 * @swagger
 * /metodosPago/{_id}:
 *  delete: 
 *      summary: Borrar un Metodo de Pago
 *      operationId: BorrarProducto
 *      tags: [MetodosPago]
 *      parameters:
 *        - in: path
 *          name: _id
 *          description: Envie el id del metodo a borrar
 *          required: true
 *          schema:
 *              type: string
 *              format: _id
 *              example: 614550cdcf3b0d89faf10195
 *      responses:
 *          201:
 *              description: Metodo de Pago Borrado correctamente 
 *          401: 
 *              description: Usted no esta autorizado - No existe un metodo de pago con este id
 * 
 */

router.delete('/:_id', isAdmin, delPago);


/**
 * @swagger
 * tags:
 *  name: MetodosPago
 *  description: Seccion de Metodos de Pago
 *  
 * components:
 *  schemas:    
 *      metodoPago:
 *          type: objetc
 *          required:
 *              -formaPago          
 *          properties:
 *              formaPago:
 *                  type: string    
 *                  description: Nombre de la Forma de pago
 *          example:
 *              formaPago: Debito 
 *      metodoPut:
 *          type: objetc
 *          required:
 *              -formaPago          
 *          properties:
 *              formaPago:
 *                  type: string    
 *                  description: Nombre de la Forma de pago
 *          example:
 *              formaPago: Pago electronico
 *              
 */

module.exports = router;