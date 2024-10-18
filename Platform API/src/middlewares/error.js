const ErrorResponse = require('../utils/error.response');

function handleError(err, req, res, next) {
    let error = { ...err };
    error.message = err.message;

    // Duplicate key error (e.g., unique constraint violation)
    if (err.code === 11000) {
        let message;
        Object.keys(err.keyValue).forEach((key) => {
            message = `${key} already exists`;
        });

        error = new ErrorResponse(message, 400);
    }

    // Validation errors
    if (err.name === 'ValidationError') {
        let message;
        Object.keys(err.errors).forEach((field) => {
            message = err.errors[field].message;
        });
        
        error = new ErrorResponse(message, 400);
    }

    // Cast errors (e.g., invalid ObjectId)
    if (err.name === 'CastError') {
        const field = err.path;
        const message = `Invalid ${field}`;
        
        error = new ErrorResponse(message, 400);
    }

    // ReferenceError
    if (err.name === 'ReferenceError') {
        const message = err.message;
        error = new ErrorResponse(message, 400);
    }

    // Custom error handling
    if (err.name === 'CustomError') {
        const message = err.message;
        error = new ErrorResponse(message, 400);
    }
    
    // TypeError error handling
    if (err.name === 'TypeError') {
        const message = err.message;
        error = new ErrorResponse(message, 400);
    }

    // SyntaxError error handling
    if (err.name === 'SyntaxError') {
        const message = err.message;
        error = new ErrorResponse(message, 400);
    }

    // StrictPopulateError error handling
    if (err.name === 'StrictPopulateError') {
        const message = err.message;
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Internal server error"
    });
}

module.exports = handleError;