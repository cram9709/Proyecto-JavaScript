const express = require('express');
const router = express.Router();

const { idValido } = require('../middlewares/validarIndex.middleware');
const { isAdmin } = require('../middlewares/isAdmin.middelware');
const { getRegistro,putRegistro} = require('../controllers/registro.controller');



/**
 * @swagger
 * /configUsuarios:
 *  get: 
 *      summary: Obtener todos los usuarios del sistema
 *      tags: [ConfiguracionUsuarios]
 *      responses:
 *          200:
 *              description: "Todos los usuarios"
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: array 
 *                          items:
 *                              $ref: "#/components/schemas/usuario"
 */

router.get('/', isAdmin, getRegistro );

/**
 * @swagger
 * /configUsuarios/{_id}:
 *  put: 
 *      summary: Actualizar  estado de un usuario
 *      operationId: ActualizarPedido
 *      tags: [ConfiguracionUsuarios]
 *      parameters:
 *        - in: path
 *          name: _id
 *          description: Envie el id del pedido a modificar
 *          required: true
 *          schema:
 *              type: string
 *              format: _id
 *              example: 6145407bd17122b8283b0858
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/userPut"
 *      responses:
 *          201:
 *              description: Estado de usuario Actualizado correctamente 
 *          401: 
 *              description: Usted no esta autorizado - No existe un usaurio con este id
 * 
 */

router.put('/:_id',isAdmin,  idValido, putRegistro);

/**
 * @swagger
 * tags:
 *  name: ConfiguracionUsuarios
 *  description: Seccion de usuarios
 *  
 * components:
 *  schemas:    
 *      usuario:
 *          type: objetc
 *          required:
 *              -user
 *              -names           
 *              -email  
 *              -telf   
 *              -address    
 *              -pass
 *              -isAdmin
 *          properties:
 *              user:
 *                  type: string
 *                  description: Nombre de usuario
 *              names:
 *                  type: string    
 *                  description: Nombre Y Apellido real del Usuario
 *              email:
 *                  type: string
 *                  description: Email del usuario
 *              telf:
 *                  type: string
 *                  description: Numero de telefono celular
 *              address:
 *                  type: object
 *                  description: Direccion del Usuario
 *              pass:
 *                  type: string
 *                  description: Contraseña de acceso usuario
 *              isAdmin:
 *                  type: boolean
 *                  description: Diferenciador de rol de usuario
 *              isActivo:
 *                  type: boolean
 *                  description: Describe si un usuario esta habilitado
 *          example:
 *              user: usuario
 *              names: Nombre Apellido
 *              email: usuario@tienda.com
 *              telf: "301387405"
 *              agendaDirecciones: {direccion: "calle 11 carrera 12"}
 *              pass: "12345" 
 *              isAdmin: false   
 *  
 *      userPut:
 *          type: objetc
 *          required:
 *              -iActivo
 *          properties:
 *              user:
 *                  type: bolean
 *                  description: Nombre de usuario
 *          example:
 *              isActivo: false  
 *              
 */
module.exports = router;