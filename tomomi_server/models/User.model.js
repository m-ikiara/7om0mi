/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const { genSalt, hash } = require('bcrypt');
const mongoose = require('mongoose');

/**
 * userSchema Represents a User.
 *
 * @typedef {Object} User
 * @property {string} username - Unique username. This field is required.
 * @property {string} email - User's email address. This field is required.
 * @property {string} password - User's password. This field is required.
 * @property {boolean} isVerified - User's verification status. This field is required.
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [
        true,
        'What should I call you? =-C',
      ],
      unique: [
        true,
        'There can only be one! >=-[',
      ],
    },
    email: {
      type: String,
      required: [
        true,
        'Oooh! We need your email =-)',
      ],
      unique: [
        true,
        'Oopsie woopsie! You\'re already registered =-)',
      ],
    },
    password: {
      type: String,
      required: [
        true,
        'UwU enter your password =-)',
      ],
    },
    regId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * pre Performs password obfuscation.
 */
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});
/**
 * User model for interacting with the database.
 * @class
 * @name User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
