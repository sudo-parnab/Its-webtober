const http = require('http');
const app = require('./app');
const { mongooseConnect } = require('./config/mongoose');

const PORT = process.env.PORT || 5000;

// Create a new HTTP server using the app as its request listener.
const server = http.createServer(app)

const startServer = async () => {
    try {
        await mongooseConnect();

        server.on('error', (error) => {
            throw new Error(error.message);
        });

        server.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}`));
    } catch (error) {
        console.log(`Server failed to start: ${error.message}`)
    }
}

startServer(); // Starts the server