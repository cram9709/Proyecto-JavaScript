const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "SprintProyect 1 Acamica",
            version: "2.0.0",
            description: "Entrega primer Sprint Acamica",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: 'JWT'
                }           
                
            }
        },
        security: [
            {
                bearerAuth: [] 
            }
        ]
    },
    apis: ["./src/routes/*.js"]
}

module.exports = swaggerOptions;