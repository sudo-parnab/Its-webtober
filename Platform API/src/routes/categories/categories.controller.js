const mongoose = require('mongoose');

const Category = require('../../models/categories.model');
const ErrorResponse  = require('../../utils/error.response')

/**
 * @desc Get all categories.
 * @route GET /api/v1/categories
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing an array of categories or an error message.
 */
const httpGetCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({})
            .select('name')
            .sort('-createdAt');
      
        // Handle if no categories are found
        if (categories.length === 0) return next(new ErrorResponse('No category found', 404));
        
        res.status(200).json({ categories });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Get category by ID.
 * @route GET /api/v1/categories/:id
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing the category or an error message.
 */
async function httpGetCategoryByID(req, res, next) {
    try {
        // Validate the ID parameter
        if (!mongoose.isValidObjectId(req.params.id))
            return next(new ErrorResponse('Invalid ID', 400));
        
        // Find the category by ID
        const category = await Category.findById(req.params.id)
            .select('-_id -__v');

        // Handle if category is not found
        if (!category) return next(new ErrorResponse('Category not found', 404));

        res.status(200).json({ category });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Create a new category.
 * @route POST /api/v1/categories
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing the success message or an error message.
 */
const httpCreateCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        // Validate that a category name is provided
        if (!name) return next(new ErrorResponse('Please provide a category name', 400));

        // Create the category
        const category = await Category.create({ name });

        res.status(201).json({ message: `Category created with ID ${category._id}` });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Update a category by ID.
 * @route POST /api/v1/categories/:id
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing the success message or an error message.
 */
const httpUpdateCategory = async (req, res, next) => {
    try {
        // Validate the ID parameter
        if (!mongoose.isValidObjectId(req.params.id))
            return next(new ErrorResponse('Invalid ID', 400));
        
        const { name } = req.body;

         // Validate that a category name is provided
        if (!name) return next(new ErrorResponse('Please provide a category name', 400));

        // Format the name by removing whitespace and converting to lowercase
        const formattedName = name.trim().replace(/\s/g, '-').toLowerCase();

        // Check if the name already exists for another use
        if (formattedName === await Category.findOne({ name: formattedName }))
            return next(new ErrorResponse('Please provide a unique name', 400));

        // Check if the category exists
        const existedCategory = await Category.findById(req.params.id);

        // Handle if the category is not found
        if (!existedCategory)
            return next(new ErrorResponse('Category not found', 404));

        // Update the category by ID
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );

        res.status(200).json({ message: `Category with ID ${category._id} was modified` });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Delete a category by ID.
 * @route DELETE /api/v1/categories/:id
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing a success message or an error message.
 */
const httpDeleteCategory = async (req, res) => {
    try {
        // Validate the provided ID
        if (!mongoose.isValidObjectId(req.params.id))
            return next(new ErrorResponse('Invalid ID', 400));
        
        const category = await Category.findById(req.params.id);

        if (!category) return next(new ErrorResponse('Category not found', 404));

        await Category.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: `Category with ID ${req.params.id} was deleted` });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    httpGetCategories,
    httpGetCategoryByID,
    httpCreateCategory,
    httpUpdateCategory,
    httpDeleteCategory,
};