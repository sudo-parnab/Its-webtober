const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config()

const User = require('../../models/users.model');
const TokenBlacklist = require('../../models/tokenblacklist.model');
const ErrorResponse  = require('../../utils/error.response')

/**
 * @desc Register a new user.
 * @route POST /api/v1/auth/register
 * @access Public
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing the registered user's ID or an error message.
 */
async function httpRegisterUser(req, res, next) {
    try {
        const { username, email, password } = req.body;

        // Check if required fields are provided
        if (!username || !email || !password)
            return next(new ErrorResponse('Please provide username, email and password', 400));

        // Create a new user with the provided details
        const user = await User.create({ username, email, password });

        res.status(201).json({ message: `User registered with ID: ${user._id}` });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Register a new admin.
 * @route POST /api/v1/auth/register
 * @access Public
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing the registered user's ID or an error message.
 */
async function httpRegisterAdmin(req, res, next) {
    try {
        const { username, email, password, isAdmin } = req.body;

        // Check if required fields are provided
        if (!username || !email || !password)
            return next(new ErrorResponse('Please provide username, email and password', 400));

        // Check if required admin status is set to true
        if (!isAdmin) return next(new ErrorResponse('Please set admin status to true', 400));

        // Create a new user with the provided details
        const admin = await User.create({ username, email, password, isAdmin });

        res.status(201).json({ message: `Adim registered with ID: ${admin._id}` });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Login a user.
 * @route POST /api/v1/auth/login
 * @access Public
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing the access token or an error message.
 */
async function httpLoginUser(req, res, next) {
    try {
        const { username, email, password } = req.body;

        // Validate that username or email and password are provided
        if ((!username && !email) || !password)
            return next(new ErrorResponse('Please provide username or email and password', 400));

        let user;

        // Find user by username
        if (username) {
            const formattedName = username.trim().replace(/\s/g, '').toLowerCase();
            user = await User.findOne({ username: formattedName });
        }

        // Find user by email
        if (email) {
            const formattedEmail = email.trim().toLowerCase();
            user = await User.findOne({ email: formattedEmail });
        }

        // Handle incorrect credentials for username or email
        if (!user) return next(new ErrorResponse('Incorrect credentials', 401));

        // Compare password with hashed password
        const auth = await bcrypt.compare(password, user.password);

        // Handle incorrect credentials for password
        if (!auth) return next(new ErrorResponse('Incorrect credentials', 401));

        // Generate and sign the access token
        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ accessToken });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Logout a user.
 * @route GET /api/auth/logout
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response indicating the logout status.
 */
async function httpLogoutUser(req, res, next) {
    try {
        const authHeader = req.header('Authorization') || req.header('authorization');

        const token = authHeader && authHeader.split(' ')[1];

        // Add the token to the blacklist
        await TokenBlacklist.create({ token });

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    httpRegisterUser,
    httpRegisterAdmin,
    httpLoginUser,
    httpLogoutUser,
}