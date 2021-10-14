const express = require('express');
const router = express.Router();


const { getDirecciones, putDirecciones } = require('../controllers/agendaDirecciones.controller');

/**
 * @swagger
 * /agendaDirecciones:
 *  get: 
 *      summary: Obtener todos los usuarios del sistema
 *      tags: [agendaDirecciones]
 *      responses:
 *          200:
 *              description: "Todos las direcciones de un Usuario"
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: array 
 *                          items:
 *                              $ref: "#/components/schemas/agenda"
 */
router.get('/', getDirecciones);

/**
 * @swagger
 * /agendaDirecciones:
 *  put: 
 *      summary: Actualizar  estado de un usuario
 *      operationId: ActualizarPedido
 *      tags: [agendaDirecciones]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/direccionNueva"
 *      responses:
 *          201:
 *              description: Estado de usuario Actualizado correctamente 
 *          401: 
 *              description: Usted no esta autorizado - No existe un usaurio con este id
 * 
 */
router.put('/', putDirecciones);

/**
 * @swagger
 * tags:
 *  name: agendaDirecciones
 *  description: Seccion de direcciones
 *  
 * components:
 *  schemas:    
 *      agenda:
 *          type: objetc
 *          required:
 *              -agendaDirecciones
 *          properties:
 *              agendaDirecciones:
 *                  type: objetc
 *                  description: direcciones del usuario
 *          example:
 *              agendaDirecciones: {direccion: "calle 11 carrera 12"}
 *  
 *      direccionNueva:
 *          type: objetc
 *          required:
 *              -direccion    
 *          properties:
 *              direccion:
 *                  type: object
 *                  description: direccion agregar
 *          example:
 *              direccion: "calle 11 carrera 12"
 *              
 */
module.exports = router;