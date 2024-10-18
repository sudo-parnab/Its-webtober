const postsRouter = require('express').Router();

const { authToken } = require('../../middlewares/auth');
const {
    httpGetPosts,
    httpGetPostByID,
    httpGetPostByCategory,
    httpGetPostsCount,
    httpCreatePost,
    httpUpdatePost,
    httpToggleLike,
    httpGetTotalLikes,
    httpDeletePost,
} = require('./posts.controller');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Posts endpoints
 *  
 * components:
 *   schemas:
 *     PostRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the post
 *         content:
 *           type: string
 *           description: Content of the post
 *         category:
 *           type: string
 *           description: Category name for the post
 * 
 *     UpdateLikeReponse:
 *       type: object
 *       properties:
 *         post:
 *           type: object
 *           description: Post object
 * 
 *     PostMultipleResponse:
 *       type: object
 *       properties:
 *         posts:
 *           type: array
 *           items:
 *              type: object
 *              description: Posts object
 * 
 *     PostSingleResponse:
 *       type: object
 *       properties:
 *         post:
 *           type: object
 *           description: Post object
 * 
 *     GetCountResponse:
 *       type: object
 *       properties:
 *         postsCount:
 *           type: number
 *           description: Posts count
 * 
 *     GetLikeResponse:
 *       type: object
 *       properties:
 *         postsCount:
 *           type: number
 *           description: Posts count
 *              
 */

/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     tags: [Posts]
 *     summary: Get all posts
 *     description: Retrieve all posts with specific fields
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostMultipleResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
postsRouter.get('/', httpGetPosts);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   get:
 *     tags: [Posts]
 *     summary: Get a post by ID
 *     description: Retrieve a post by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostSingleResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
postsRouter.get('/:id', authToken, httpGetPostByID);

/**
 * @swagger
 * /api/v1/posts/get/categories?category:
 *   get:
 *     tags: [Posts]
 *     summary: Get posts by category
 *     description: Retrieve posts based on category
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostMultipleResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
postsRouter.get('/get/categories', httpGetPostByCategory);

/**
 * @swagger
 * /api/v1/posts/get/count:
 *   get:
 *     tags: [Posts]
 *     summary: Get total posts count
 *     description: Retrieve the total count of posts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCountResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
postsRouter.get('/get/count', authToken, httpGetPostsCount);

/**
 * @swagger
 * /api/v1/posts:
 *   post:
 *     tags: [Posts]
 *     summary: Create a post
 *     description: Create a new post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostRequest'
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
postsRouter.post('/', authToken, httpCreatePost);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   put:
 *     tags: [Posts]
 *     summary: Update a post
 *     description: Update an existing post by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostRequest'
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
postsRouter.put('/:id', authToken, httpUpdatePost);

/**
 * @swagger
 * /api/v1/posts/toggle/likes/{id}:
 *   put:
 *     tags: [Posts]
 *     summary: Toggle like on a post
 *     description: Toggle the like status on a post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateLikeReponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse' 
 */
postsRouter.put('/toggle/likes/:id', authToken, httpToggleLike);

/**
 * @swagger
 * /api/v1/posts/get/likes/{id}:
 *   get:
 *     tags: [Posts]
 *     summary: Get total likes for a post
 *     description: Retrieve the total number of likes for a post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetLikeResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
postsRouter.get('/get/likes/:id', httpGetTotalLikes);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   delete:
 *     tags: [Posts]
 *     summary: Delete a post
 *     description: Delete a post by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
postsRouter.delete('/:id', authToken, httpDeletePost);


module.exports = postsRouter;
