const mongoose = require('mongoose');

const Post = require('../../models/posts.model');
const User = require('../../models/users.model');
const Cateory = require('../../models/categories.model');
const ErrorResponse  = require('../../utils/error.response')

/**
 * @desc Get all posts.
 * @route GET /api/v1/posts
 * @access Public
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing an array of posts or an error message.
 */
const httpGetPosts = async (req, res, next) => {
    try {
        // Retrieve all posts and select specific fields
        const posts = await Post.find({})
            .select('title image author category likes comments')
            .populate({ path: 'author', select: 'username -_id' })
            .populate({ path: 'likes', select: 'username -_id' })
            .sort('-createdAt');
      
        // Handle if no posts are found
        if (posts.length === 0) return next(new ErrorResponse('No posts found', 404));

        res.status(200).json({ posts });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Get a post by ID.
 * @route GET /api/v1/posts/:id
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing the post or an error message.
 */
async function httpGetPostByID(req, res, next) {
    try {
        // Validate the provided post ID
        if (!mongoose.isValidObjectId(req.params.id))
            return next(new ErrorResponse('Invalid ID', 400));
        
        // Find the post by ID and populate related fields
        const post = await Post.findById(req.params.id)
            .select('title content author category likes comments -_id')
            .populate({ path: 'author', select: 'username -_id' })
            .populate({ path: 'likes', select: 'username -_id' })

        // Handle if no post is found
        if (!post) return next(new ErrorResponse('No post found', 404));

        res.status(200).json({ post });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Get posts by category.
 * @route GET /api/v1/posts/get/categories?category={{category}}
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing array of the filtered posts or an error message.
 */
async function httpGetPostByCategory(req, res, next) {
    try {
        // Retrieve the category from the query parameters
        const { category } = req.query;

        // Format the category by trimming, 
        // replacing spaces with hyphens, and converting to lowercase
        let formattedCategory;
        if (category) {
            formattedCategory = category.trim().replace(/\s/g, '-').toLowerCase();
        }

        // Find posts matching the specified category and populate related fields
        const posts = await Post.find({ category: formattedCategory })
            .select('title content author category image likes comments')
            .populate({ path: 'author', select: 'username -_id' })
            .populate({ path: 'likes', select: 'username -_id' })
            .sort('-createdAt');
      
        // Handle if no posts are found for the specified category
        if (filteredPosts.length === 0)
            return next(new ErrorResponse(`Post with category ${category} not found`, 404));

        res.status(200).json({ posts });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Get the count of posts.
 * @route GET /api/v1/posts/get/count
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function. 
 * @returns {Object} - The response containing the count of posts or an error message.
 */
async function httpGetPostsCount(req, res, next) {
    try {
        // Count the number of posts
        const postsCount = await Post.countDocuments();

        // Handle if no posts are found
        if (postsCount === 0) return next(new ErrorResponse('No post found', 404));

        res.status(200).json({ postsCount });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Create a new post.
 * @route GET /api/v1/posts/get/count
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing a success message or an error message.
 */
const httpCreatePost = async (req, res) => {
    try {
        const { title, content, category } = req.body;

        let formattedCategory;
        if (category) {
            // Format the category name
            formattedCategory = category.trim().replace(/\s/g, '-').toLowerCase();
        }

        // Check if the formatted category is specified but not found
        if (formattedCategory && !(await Cateory.findOne({ name: formattedCategory })))
            return next(new ErrorResponse('Category not found', 404));

        // Create the new post
        const post = await Post.create({
            title,
            content,
            category: formattedCategory,
            author: req.user.id,
        });

        res.status(201).json({ message: `Post created with ${post._id}` });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Update a post.
 * @route GET /api/v1/posts/get/count
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response indicating whether the post was updated or an error message.
 */
const httpUpdatePost = async (req, res, next) => {
    try {
        // Check if the post ID is valid
        if (!mongoose.isValidObjectId(req.params.id))
            return next(new ErrorResponse('Invalid ID', 400));
        
        // Find the post by ID and check if the current user is the author
        const post = await Post.findOne({ _id: req.params.id, author: _id });

        if (!post) return next(new ErrorResponse('You can\'t update this post', 404));

        const { title, content, category } = req.body;

        // Validate the title length
        if (title && title.length > 100)
            return next(new ErrorResponse('Title field must not exceed 100 characters', 400));

        let formattedCategory
        if (category) {
            formattedCategory = category.trim().replace(/\s/g, '-').toLowerCase();
        }

        // Check if the formatted category exists
        if (formattedCategory && !(await Cateory.findOne({ name: formattedCategory })))
            return next(new ErrorResponse('Category name not found', 400));
        
        // Update the post
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                category: formattedCategory,
            },
            { new: true }
        );

        res.status(200).json({ message: `Post with ID ${updatedPost._id} was updated` });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Toggle like on a post.
 * @route PUT /api/v1/posts/toggle/likes/{id}:
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing the updated post or an error message.
 */
async function httpToggleLike(req, res, next) {
    try {
        // Check if the post ID is valid
        if (!mongoose.isValidObjectId(req.params.id))
            return next(new ErrorResponse('Invalid ID', 400));

        const post = await Post.findById(req.params.id);
        if (!post) return next(new ErrorResponse('Post not found', 404));

        const likedIndex = post.likes.indexOf(req.user.id);
        likedIndex === -1 ? post.likes.push(req.user.id) : post.likes.splice(likedIndex, 1);
    
        await post.save();

        const totalLikes = post.likes.length;

        res.status(200).json({ totalLikes });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Get the total number of likes on a post.
 * @route PUT /api/v1/posts/get/likes/:id
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing the total likes count or an error message.
 */
async function httpGetTotalLikes(req, res, next) {
    try {
        // Check if the post ID is valid
        if (!mongoose.isValidObjectId(req.params.id))
            return next(new ErrorResponse('Invalid ID', 400));
        
        const post = await Post.findById(req.params.id);
        if (!post) return next(new ErrorResponse('No posts found', 404));

        const likesCount = post.likes.length;

        res.status(200).json({ likesCount });
    } catch (error) {
        next(error);
    }
}


/**
 * @desc Delete a post.
 * @route PUT /api/v1/posts/:id
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing a success message or an error message.
 */
const httpDeletePost = async (req, res) => {
    try {
        // Validate the provided post ID
        if (!mongoose.isValidObjectId(req.params.id))
            return next(new ErrorResponse('Invalid ID', 400));

        // Find the post by ID and author
        const post = await Post.findOne({ _id: req.params.id, author: req.user.id });
        if (!post) return next(new ErrorResponse('Post not found', 400));

        // Delete the post
        await Post.deleteOne({ _id: post._id });

        res.status(200).json({ message: `post with ID ${req.params.id} was deleted` });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    httpGetPosts,
    httpGetPostByID,
    httpGetPostByCategory,
    httpGetPostsCount,
    httpCreatePost,
    httpUpdatePost,
    httpToggleLike,
    httpGetTotalLikes,
    httpDeletePost,
};