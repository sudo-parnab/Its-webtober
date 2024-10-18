const cors = require('cors')
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const xss = require("xss-clean");

require('dotenv').config();

const apiV1Router = require('./routes/apiV1');
const handleError = require('./middlewares/error');
const limiter = require('./config/rate.limit');

const app = express();

// Security configuration
app.use(helmet()); // adds security headers
app.use(cors()); // enables Cross-Origin Resource Sharing
app.options('*', cors()); // cross-origin resource sharing for all routes
app.use(xss()); // prevent Cross-site Scripting XSS
app.use(mongoSanitize()); // prevent SQL injection
app.use(hpp()); //HTTP Param Pollution
app.use(limiter); //limit queries per 15mn

// Enable parsing Json payload  in the request body
app.use(express.json());

// Logs information about incoming requests and outgoing responses in the terminal
app.use(morgan('combined'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
    next()
});

// Routes
app.get('/', (req, res) => res.status(200).json({ message: 'Welcome... Blogging API!' }));
app.use('/api/v1', apiV1Router);
app.get('/*', (req, res) => res.status(200).json({ message: '404 - Not Found' }));

// Error handling middleware
app.use(handleError);

module.exports = app;