const authRouter = require('express').Router();

const { authToken } = require('../../middlewares/auth');
const {
    httpRegisterUser,
    httpRegisterAdmin,
    httpLoginUser,
    httpLogoutUser,
} = require('./auth.controller');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication endpoints
 * 
 * components:
 *   schemas:
 *     RegisterUserRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Username of the user
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         password:
 *           type: string
 *           format: password
 *           description: Password of the user
 *       required:
 *         - username
 *         - email
 *         - password
 *
 *     RegisterAdminRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Username of the user
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         password:
 *           type: string
 *           format: password
 *           description: Password of the user
 *         isAdmin:
 *           type: boolean
 *           description: Status of the user
 *       required:
 *         - username
 *         - email
 *         - password
 *         - isAdmin
 * 
 *     ResponseMessage:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Success message
 *
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         password:
 *           type: string
 *           format: password
 *           description: Password of the user
 *       required:
 *         - password
 *       oneOf:
 *         - required:
 *           - username
 *         - required:
 *           - email
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: Access token for authentication
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if there was an error.
 *           default: false
 *         message:
 *           type: string
 *           description: The error message
 *
 */

/**
 * @swagger
 * /api/v1/auth/register/user:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseMessage'
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
authRouter.post('/register/user', httpRegisterUser);

/**
 * @swagger
 * /api/v1/auth/register/admin:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterAdminRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseMessage'
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
authRouter.post('/register/admin', httpRegisterAdmin);


/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
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
authRouter.post('/login', httpLoginUser);


/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     tags: [Authentication]
 *     summary: Logout a user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseMessage'
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
authRouter.get('/logout', authToken, httpLogoutUser);

module.exports = authRouter;