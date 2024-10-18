const mongoose = require('mongoose');

require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => console.log('MongoDB connection is ready'));
mongoose.connection.on('error', err => console.error(err.message));

async function mongooseConnect() {
    try {
        await mongoose.connect(MONGO_URL);
    } catch (error) {
        console.error(error.message);
    }
}

async function mongooseDisconnect() {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = { mongooseConnect, mongooseDisconnect };