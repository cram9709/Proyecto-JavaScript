require('dotenv').config();
require('./dataBase');
const express = require('express');
const helmet = require('helmet');
const expressJwt = require('express-jwt');
const swaggerJsDocs = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./utils/swaggerOptions');

const llenadoDatosIniciales = require('./controllers/llenadodedatos');


const app = express();
app.use(helmet());
app.use(express.json());

app.use(
    expressJwt({
        secret: process.env.secret,
        algorithms: [process.env.algorithms],
        requestProperty : process.env.requestProperty,
    }).unless({
        path: ['/login', '/registro', /\/api-docs([a-zA-Z0-9\-\.\/]*)/,]
    })
)


app.use('/registro', require('./routes/registro.routes'));

const swaggerSpecs = swaggerJsDocs( swaggerOptions );
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));



app.use('/login', require('./routes/login.routes'));
app.use('/productos', require('./routes/productos.routes'));
app.use('/pedidos', require('./routes/pedidos.routes'));
app.use('/metodosPago', require('./routes/metodosPago.routes'));
app.use('/configUsuarios',require('./routes/configUsuarios.routes'));
app.use('/agendaDirecciones',require('./routes/agendaDirecciones.routes'));


llenadoDatosIniciales();

app.listen(process.env.PORT, () => { console.log('Hola desde el puerto ' + process.env.PORT); });

module.exports = app;