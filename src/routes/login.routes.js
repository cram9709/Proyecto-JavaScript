const express = require('express');
const router = express.Router();

const login = require('../controllers/login.controller');


/**
 * @swagger
 * /login:
 *  post: 
 *      summary: Logear usuario
 *      tags: [Logeo]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login"
 *      responses:
 *          201:
 *              description: "Usuario Logeado usé este token: "
 */

router.post('/', login);

/**
 * @swagger
 * tags:
 *  name: Logeo 
 *  description: Seccion de Usuarios
 *  
 * components:
 *  schemas:    
 *      login:
 *          type: objetc
 *          required:
 *              -user
 *              -pass
 *          properties:
 *              user:
 *                  type: string    
 *                  description: Nombre del usuario 
 *              pass:
 *                  type: string
 *                  description: contraseña del usuario
 *          example:
 *              user: admin
 *              pass: "12345"
 *               
 * 
 */

module.exports = router;