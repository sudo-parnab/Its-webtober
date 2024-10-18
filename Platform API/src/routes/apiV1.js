const apiV1Router = require('express').Router();

const swaggerRouter = require('../config/swagger')
const authRouter = require('./auth/auth.router')
const categoriesRouter = require('./categories/categories.router')
const postsRouter = require('./posts/posts.router');
const usersRouter = require('./users/users.router')

apiV1Router.use('/api-docs', swaggerRouter)
apiV1Router.use('/auth', authRouter);
apiV1Router.use('/categories', categoriesRouter);
apiV1Router.use('/posts', postsRouter);
apiV1Router.use('/users', usersRouter);

module.exports = apiV1Router;