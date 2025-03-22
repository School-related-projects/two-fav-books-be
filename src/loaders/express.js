const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

// TODO: DECIDE ON WHETHER TO USE THIS OR NOT
module.exports = (app) => {
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors({
        origin: process.env.FRONTEND_URL || '*', // Your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true // Enable if using cookies/sessions
    }));

    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    });

    // Transforms raw string of req.body into JSON
    app.use(bodyParser.json({ limit: '10mb' }));
    // Parses urlencoded bodies (as sent by HTML forms)
    app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

    //
    app.set('trust proxy', 1);

    // Creates a session //TODO: DECIDE ON WHETHER TO USE THIS OR NOT
    app.use(
        session({
            secret: "simple-secret",
            resave: false,
            saveUninitialized: false, // https://stackoverflow.com/questions/40381401/when-use-saveuninitialized-and-resave-in-express-session
            cookie: {
                secure: false,
                maxAge: 24 * 60 * 60 * 1000,
            },
        }),
    );
};
