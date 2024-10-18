const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
    maxlength: [20, 'Please username must not exceed 20 characters'],
    unique: [true, 'Username already exists'],
    lowercase: true,
    trim: true,
    set: value => {
      if (value) return value.replace(/\s/g, '');
      return value;
    },
  },
  email: {
    type: String,
    required: [true, 'Please add an email address'],
    unique: [true, 'Email address already exists'],
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Invalid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please add a secure password'],
    trim: true,
    minlength: [6, 'Enter at least 6 characters'],
  },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });


userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    console.error(error);
  }
});

module.exports = mongoose.model('User', userSchema);