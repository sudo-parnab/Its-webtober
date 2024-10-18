# Blogging Platform RESTful API

This is a RESTful API for a blogging platform that allows users to create, read, update, and delete blog posts. The API supports user authentication and authorization, allowing users to create and manage their own posts.

## Features

- User registration: Users can create an account by providing a unique username and password.
- User login: Users can log in with their credentials and receive a JWT token for authentication.
- Create blog posts: Authenticated users can create new blog posts by providing a title and content.
- Read blog posts: Users can retrieve a list of all blog posts or view a specific post by its ID.
- Update blog posts: Users can update their own blog posts by providing a new title and content.
- Delete blog posts: Users can delete their own blog posts.

## Technologies

The API is built using the following technologies:

- Node.js: A JavaScript runtime environment for server-side development.
- Express.js: A web application framework for building APIs with Node.js.
- MongoDB: A NoSQL database for storing and retrieving blog post data.
- Mongoose: An object data modeling (ODM) library for MongoDB and Node.js.
- JWT: JSON Web Tokens for user authentication and authorization.
- Bcrypt: A library for hashing and comparing passwords securely.
- Helmet: A middleware provides protection by setting appropriate headers.
- Cors: A mechanism that enables Cross-Origin Resource Sharing.
- DotENV: Environments variables.
- Morgan: Logs information about incoming requests and outgoing responses.
- Multer: Handle Files uploads.
- PM2: Optimize the API for scalability and performance.
- Validator: Validate user input for email.

## Setup

1. Clone the repository:

2. Install the dependencies:

   cd Platform API
   npm install

3. Configure the environment variables:

- Create a `.env` file in the root directory.
- Define the following variables in the `.env` file:
  - `PORT`: The port number for the server (e.g., `3000`).
  - `MONGODB_URI`: The connection string for your MongoDB database.
  - `JWT_SECRET`: A secret key for signing JWT tokens.

4. Start the server:

   npm run start

5. Testing the API

6. Error Handling

   The API handles errors by returning appropriate HTTP status codes and error messages. Common error scenarios include invalid requests, unauthorized access, and internal server errors. Error messages are returned in JSON format for easy consumption by clients.
