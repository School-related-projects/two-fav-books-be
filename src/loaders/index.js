const expressLoader = require('./express.js');
const routeLoader = require('../routes/books');
const swaggerLoader = require('./swagger');

module.exports = async (app) => {
    try {
        // Load Express middlewares
        expressLoader(app);
        console.log('Express middlewares loaded');

        // Load API route handlers
        routeLoader(app);
        console.log('API routes loaded');

        // Load Swagger
        swaggerLoader(app);
        console.log('Swagger documentation initialized');

        // Error Handler
        app.use((err, req, res, next) => {
            const { message, status = 500 } = err;
            res.status(status).send({ message });
        });

    } catch (error) {
        console.error('Error during app initialization:', error);
        throw error;
    }
};
