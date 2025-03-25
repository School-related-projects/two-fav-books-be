const express = require('express');
require('dotenv').config();

// Set environment
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8000;

// Create Express application
const app = express();

const loaders = require("./src/loaders");

async function startServer() {
    try {
        // Initialize all application loaders
        await loaders(app);
        console.log(`App initialized successfully in ${NODE_ENV} mode`);

        // Start server
        app.listen(PORT, () => {
            console.log(`${NODE_ENV} mode     ||  Local:   http://localhost:${PORT}     || API Docs: http://localhost:${PORT}`);});
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
// Start the server
startServer();
