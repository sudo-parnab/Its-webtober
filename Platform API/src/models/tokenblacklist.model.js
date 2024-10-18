const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('TokenBlacklist', tokenBlacklistSchema);