/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const mongoose = require('mongoose');

/**
 * userSchema Represents a User.
 *
 * @typedef {Object} User
 * @property {string} email - The email address of the user. This field is required.
 * @property {string} password - The password of the user. This field is required.
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Oooh! We need your email =-)'],
    unique: [true, 'Oopsie woopsie! You\'re already registered =-)'],
  },
  password: {
    type: String,
    required: [true, 'UwU enter your password =-)'],
  },
});

/**
 * User model for interacting with the database.
 * @class
 * @name User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
