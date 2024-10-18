const jwt = require("jsonwebtoken");

const TokenBlacklist = require('../models/tokenblacklist.model');
const ErrorResponse = require('../utils/error.response')


/**
 * @desc Middleware to authenticate and authorize a user token.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function to call.
 * @returns {Function} - The next function or an error.
 */
async function authToken(req, res, next) {
    try {
        const authHeader = req.header('Authorization') || req.header('authorization');

        // Check if Authorization header exists
        if (!authHeader) return next(new ErrorResponse('Unauthorized', 401));

        const token = authHeader && authHeader.split(' ')[1];

        // Check if the token is blacklisted
        const blacklistedToken = await TokenBlacklist.findOne({ token });

        // Handle blacklisted token
        if (blacklistedToken) return next(new ErrorResponse('Token is not valid', 401));

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            // Handle invalid token
            if (err) return next(new ErrorResponse('Token is not valid', 403));

            // Set the user object in the request
            req.user = decoded;

            next();
        });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Middleware to authenticate and authorize an admin user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function to call.
 * @returns {Function} - The next function or an error response.
 */
function authAdmin(req, res, next) {
    try {
        authToken(req, res, () => {
            // Check if the user is an admin
            if (req.user.isAdmin) {
                // Call the next function
                next();
            } else {
                return next(new ErrorResponse('Unauthorized', 401));
            }
        })
    } catch (error) {
        next(error);
    }
}

module.exports = { authToken, authAdmin };