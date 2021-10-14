const express = require('express');
const router = express.Router();


const { idValido } = require('../middlewares/validarIndex.middleware');
const validadUser = require('../middlewares/validarUser.middelware')
const validadEmail = require('../middlewares/validarEmail.middelware');


const {  postRegistro, } = require('../controllers/registro.controller');





/**
 * @swagger
 * /registro:
 *  post: 
 *      summary: Registra un Usuario en el sistema
 *      tags: [Usuarios]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/usuarioNuevo"
 *      responses:
 *          201:
 *              description: Usuario Registrado 
 *          401: 
 *              description: El usuario o el email ya estan registrados
 * 
 */


router.post('/',validadUser, validadEmail, postRegistro);



/**
 * @swagger
 * tags:
 *  name: Usuarios
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
 *      usuarioNuevo:
 *          type: objetc
 *          required:
 *              -user
 *              -names           
 *              -email  
 *              -telf   
 *              -agendaDirecciones    
 *              -pass
 *              -repeat_pass
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
 *              agendaDirecciones:
 *                  type: object
 *                  description: Direccion del Usuario
 *              pass:
 *                  type: string
 *                  description: Contraseña de acceso usuario
 *              repeat_pass:
 *                  type: string
 *                  description: Contraseña de acceso usuario
 *          example:
 *              user: usuario1
 *              names: Nombre Apellido
 *              email: usuario1@tienda.com
 *              telf: "301387405"
 *              agendaDirecciones: {direccion: "calle 11 carrera 12"}
 *              pass: "12345"
 *              repeat_pass: "12345"   
 *              
 */
module.exports = router;
