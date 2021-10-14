const express = require('express');
const router = express.Router();


const { getProductos, postProductos, putProductos, delProductos, cache } = require('../controllers/productos.controller')
const { idValido } = require('../middlewares/validarIndex.middleware');
const { isAdmin } = require('../middlewares/isAdmin.middelware');



/**
 * @swagger
 * /productos:
 *  get: 
 *      summary: Obtener todos los usuarios del sistema
 *      tags: [Productos]
 *      responses:
 *          200:
 *              description: "Todos los Productos"
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: array 
 *                          items:
 *                              $ref: "#/components/schemas/producto"
 */
router.get('/', cache, getProductos);

/**
 * @swagger
 * /productos:
 *  post: 
 *      summary: Agrega un nuevo producto al sistema
 *      tags: [Productos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/producto"
 *      responses:
 *          201:
 *              description: Producto Agregado correctamente 
 *          401: 
 *              description: Usted no esta autorizado- No se permiten productos con el mismo id
 * 
 */

router.post('/', isAdmin, postProductos);

/**
 * @swagger
 * /productos/{_id}:
 *  put: 
 *      summary: Actualizar un Producto
 *      operationId: ActualizarProducto
 *      tags: [Productos]
 *      parameters:
 *        - in: path
 *          name: _id
 *          description: Envie el id del metodo a modificar
 *          required: true
 *          schema:
 *              type: string
 *              format: _id
 *              example: 6145407bd17122b8283b0863
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/productoActualizar"
 *      responses:
 *          201:
 *              description: Producto Actualizado correctamente 
 *          401: 
 *              description: Usted no esta autorizado - No existe un producto con este id
 * 
 */

router.put('/:_id',isAdmin, idValido, putProductos);

/**
 * @swagger
 * /productos/{_id}:
 *  delete: 
 *      summary: Borrar un Producto
 *      operationId: BorrarProducto
 *      tags: [Productos]
 *      parameters:
 *        - in: path
 *          name: _id
 *          description: Envie el id del producto a borrar
 *          required: true
 *          schema:
 *              type: string
 *              format: _id
 *              example: 6145407bd17122b8283b085f
 *      responses:
 *          201:
 *              description: Producto Borrado correctamente 
 *          401: 
 *              description: Usted no esta autorizado - No existe un producto con este id
 * 
 */

router.delete('/:_id', isAdmin, delProductos);

/**
 * @swagger
 * tags:
 *  name: Productos
 *  description: Seccion de productos
 *  
 * components:
 *  schemas:    
 *      producto:
 *          type: objetc
 *          required:
 *              -_id
 *              -name          
 *              -price  
 *          properties:
 *              _id:
 *                  type: string
 *                  description: Posición del producto en el array, se debe colocar manualmente
 *              name:
 *                  type: string    
 *                  description: Nombre del Producto
 *              price:
 *                  type: number
 *                  description: Precio del producto
 *          example:
 *              name: SalchipapaMixta
 *              price: 20000 
 * 
 *      productoActualizar:
 *          type: objetc
 *          required:
 *              -name          
 *              -price  
 *          properties:
 *              name:
 *                  type: string    
 *                  description: Nombre del Producto
 *              price:
 *                  type: number
 *                  description: Precio del producto
 *          example:
 *              name: ParriladaMixta
 *              price: 15000 
 *              
 */


module.exports = router;

