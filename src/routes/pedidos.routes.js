const express = require('express');
const router = express.Router();



const { geTpedido, postPedido, putPedido, putAdminPedido } = require('../controllers/pedidos.controller');
const { idValido } = require('../middlewares/validarIndex.middleware');
const { validarCantidad }  = require('../middlewares/validarCantidad.middleware');
const { isAdmin } = require('../middlewares/isAdmin.middelware');
const pedidoPendiente = require('../middlewares/pedidopendiente.middleware');
const { nombreProducto } = require('../middlewares/nombreProducto.middleware');


/**
 * @swagger
 * /pedidos:
 *  get: 
 *      summary: Obtener array de pedidos, si es ADMIN obtiene todos los pedidos, si es USER obtiene unicamente los pedidos a su nombre
 *      tags: [Pedidos]
 *      responses:
 *          200:
 *              description: "Pedidos"
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: array 
 *                          items:
 *                              $ref: "#/components/schemas/pedido"
 */
router.get('/', geTpedido);

/**
 * @swagger
 * /pedidos:
 *  post: 
 *      summary: Realiza un pedido con un usuario, Logear user:parapedido pass:12345
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/pedidoPost"
 *      responses:
 *          201:
 *              description: Su pedido esta pendiente, vaya a actualizar y modifique el estado de su pedido a confirmado
 *          401: 
 *              description: Error del sistema
 * 
 */

router.post('/', pedidoPendiente, nombreProducto, validarCantidad, postPedido);

/**
 * @swagger
 * /pedidos/admin/{_id}:
 *  put: 
 *      summary: Actualizar el estado de un pedido
 *      operationId: ActualizarEstadoPedido
 *      tags: [Pedidos]
 *      parameters:
 *        - in: path
 *          name: _id
 *          description: Envie el id del pedido a modificar
 *          required: true
 *          schema:
 *              type: string
 *              format: _id
 *              example: 61454a0154f1755aac9a5cc5
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/pedidoPutAdmin"
 *      responses:
 *          201:
 *              description: Producto Actualizado correctamente 
 *          401: 
 *              description: Usted no esta autorizado - No existe un producto con este id
 * 
 */

router.put('/admin/:_id', isAdmin, idValido, putAdminPedido );

/**
 * @swagger
 * /pedidos/{_id}:
 *  put: 
 *      summary: Actualizar  un pedido
 *      operationId: ActualizarPedido
 *      tags: [Pedidos]
 *      parameters:
 *        - in: path
 *          name: _id
 *          description: Envie el id del pedido a modificar
 *          required: true
 *          schema:
 *              type: string
 *              format: _id
 *              example: 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/pedidoPut"
 *      responses:
 *          201:
 *              description: Producto Actualizado correctamente 
 *          401: 
 *              description: Usted no esta autorizado - No existe un producto con este id
 * 
 */

router.put('/:_id', idValido, nombreProducto,  validarCantidad, putPedido);


/**
 * @swagger
 * tags:
 *  name: Pedidos
 *  description: Seccion de Pedidos
 *  
 * components:
 *  schemas:    
 *      pedido:
 *          type: objetc
 *          required:
 *              -_id
 *              -user
 *              -names
 *              -productos
 *              -telf
 *              -email 
 *              -address         
 *              -precioTotal    
 *              -estadoPedido
 *              -formaPago 
 *          properties:
 *              _id:
 *                  type: string
 *                  description: Posición del producto en el array
 *              names:
 *                  type: string    
 *                  description: Nombre del usuario que pide
 *              productos:
 *                  type: array
 *                  description: array de productos pedidos
 *              telf:
 *                  type: string
 *                  description: Numero de cel del usuario
 *              email:
 *                  type: string
 *                  description: Email del usuario
 *              address:
 *                  type: string
 *                  description: Direccion del usuario
 *              precioTotal:
 *                  type: number
 *                  description: Suma de precio de los productos
 *              estadoPedido:
 *                  type: string
 *                  description: Estado en que se encuentra el pedido
 *              formaPago:
 *                  type: string
 *                  description: Metodo de pago del pedido
 *          example:
 *              _id: 1
 *              user: usuario
 *              names: usuario usuario
 *              productos: [{_id: 3, name: 'Chuleta', price: 15000, }, { _id: 5, name: 'Coca Cola 500ml', price: 2000, },{ _id: 3, name: 'Chuleta', price: 15000, }]
 *              telf: "2494859"
 *              email: usuario@tienda.com
 *              address: calle223
 *              precioTotal: 32000
 *              estadoPedido: Pendiente
 *              formaPago: Efectivo
 * 
 *      pedidoPost:
 *          type: objetc
 *          required:
 *              -productos
 *              -address         
 *              -formaPago 
 *          properties:
 *              productos:
 *                  type: array
 *                  description: array de productos pedidos
 *              address:
 *                  type: string
 *                  description: Direccion del usuario
 *              formaPago:
 *                  type: string
 *                  description: Metodo de pago del pedido
 *          example:
 *              productos: [ ['Chuleta', 2 ], ['Coca Cola 500ml',1] ]
 *              address: calle2231
 *              formaPago: Efectivo
 * 
 *      pedidoPutAdmin:
 *          type: objetc
 *          required:
 *              -estadoPedido        
 *          properties:
 *              estadoPedido:
 *                  type: string
 *                  description: Estado del pedido
 *          example:
 *              estadoPedido: "En Preparación"
 * 
 *      pedidoPut:
 *          type: objetc
 *          required:
 *              -productos
 *              -estadoPedido         
 *          properties:
 *              productos:
 *                  type: array
 *                  description: array de productos pedidos
 *              estadoPedido:
 *                  type: string
 *                  description: Estado del pedido
 *          example:
 *              productos: [ ['Chuleta', 1], ['Coca Cola 500ml',2],['Picada',2]]
 *              estadoPedido: Confirmado               
 * 
 */


module.exports = router;