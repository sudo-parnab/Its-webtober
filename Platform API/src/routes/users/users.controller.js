const mongoose = require('mongoose');
const { isEmail } = require('validator');

const User = require('../../models/users.model');
const ErrorResponse  = require('../../utils/error.response')

/**
 * @desc Get all users.
 * @route GET /api/v1/users
 * @access Public
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing an array of users or an error message.
 */
async function httpGetUsers(req, res, next) {
    try {
        // Retrieve all users and exclude certain fields
        const users = await User.find({})
            .sort('-createdAt')
            .select('-__v -password');

        // Handle if no users are found
        if (users.length === 0) return next(new ErrorResponse('No user found', 404));

        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Get a user by ID
 * @route GET /api/v1/users/:id
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing the user or an error message.
 */
async function httpGetUserByID(req, res, next) {
    try {
        // Validate the provided ID
        if (!mongoose.isValidObjectId(req.params.id))
            return next(new ErrorResponse('Invalid ID', 400));
        
        // Find the user by ID and exclude certain fields
        const user = await User.findById(req.params.id)
            .select('-_id -__v -password');

        // Handle if user is not found
        if (!user) return next(new ErrorResponse('User not found', 404));

        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Update a user.
 * @route PUT /api/v1/users
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing the updated user or an error message.
 */
async function httpUpdateUser(req, res, next) {
    try {
        const { username, email, password } = req.body;

        // Check if username exceeds the maximum length
        if (username && username.length > 20)
            return next(new ErrorResponse('Please username must not exceed 20 characters', 400));

        // Format the username by removing whitespace and converting to lowercase
        const formattedUsername = username ? username.trim().replace(/\s/g, '').toLowerCase() : undefined;

        // Check if the formatted username already exists for another user
        if (formattedUsername && formattedUsername === (await User.findOne({ username: formattedUsername })))
            return next(new ErrorResponse('Please username is not unique', 400));

        // Check if the email is invalid
        if (email && !isEmail(email)) return next(new ErrorResponse('Invalid email address', 400));

        // Check if the email already exists for another use
        if (email && email === (await User.findOne({ email })))
            return next(new ErrorResponse('Please email address is not unique', 400));

        // Format the password by removing whitespace
        const formattedPassword = password ? password.trim() : undefined;

        // Check if the password length is less than 6 characters
        if (formattedPassword && formattedPassword.length < 6)
            return next(new ErrorResponse('Please enter at least 6 characters', 400));

        // Update the user with the provided data
        await User.findByIdAndUpdate(
            req.user.id,
            {
                username: formattedUsername,
                email,
                password: formattedPassword
            },
            { new: true }
        );

        res.status(200).json({ message: `User with ID ${req.user.id} was modified` });
    } catch (error) {
        next(error)
    }
}

/**
 * @desc Delete a user.
 * @route DELETE /api/v1/users
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing a success message or an error message.
 */
async function httpDeleteUser(req, res, next) {
    try {
        // Delete the user
        await User.deleteOne({ _id: req.user.id });

        res.status(200).json({ message: `User with ID ${req.user.id} was deleted` });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    httpGetUsers,
    httpGetUserByID,
    httpUpdateUser,
    httpDeleteUser
}