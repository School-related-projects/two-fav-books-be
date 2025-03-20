const express = require('express');


const app = express();

const loaders = require("./src/loaders");

const PORT = 8000;

async function startServer() {
    // Init application loaders
    try {
        await loaders(app);

        console.log('App initialized successfully');
        // Start server
        app.listen(PORT, () => {
            console.log(`Server listening on PORT ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
