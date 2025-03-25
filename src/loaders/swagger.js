const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

module.exports = (app) => {
    // Swagger configuration
    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'API Documentation',
                version: '1.0.0',
                description: 'Documentation for the API endpoints',
            },
            servers: [
                {
                    url: process.env.API_URL || `http://localhost:${process.env.PORT || 8000}`,
                    description: 'Development server',
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
        },
        // Path to the API docs
        apis: ['./src/routes/*.js'],
    };

    // Initialize swagger-jsdoc
    const swaggerDocs = swaggerJsDoc(swaggerOptions);

    // Use swagger-ui-express to serve the Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    console.log('Swagger documentation loaded at /api-docs');
};
