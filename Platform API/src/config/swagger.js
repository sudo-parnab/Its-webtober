const swaggerRouter = require('express').Router();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blogging Platform API Documentation',
      version: '1.0.0',
      description: 'RESTful API documentation for a blogging platform that allows users to create, read, update, and delete blog posts. The API supports user authentication and authorization, allowing users to create and manage their own posts.',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ['./src/routes/**/*.js'],
};

module.exports = swaggerOptions;

const swaggerSpec = swaggerJsdoc(swaggerOptions);

swaggerRouter.use('/', swaggerUi.serve);

swaggerRouter.get('/',
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      docExpansion: 'none',
      defaultModelsExpandDepth: -1,
    },
  })
);

module.exports = swaggerRouter;