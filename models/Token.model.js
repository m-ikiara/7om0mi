/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const mongoose = require('mongoose');

/**
 * tokenSchema Represents a Token.
 *
 * @typedef {Object} Token
 * @property {string} token - New Token. This field is required.
 * @property {string} userId - User UUID. This field is required.
 * @property {Date} createdAt - Time of Token creation.
 */
const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [
      true,
      'Is it really valid? X)',
    ],
    unique: [
      true,
      'You can\'t be for real XD lol',
    ],
  },
  tokenType: {
    type: String,
    enum: [
      'registration',
      'login',
      'read',
      'update',
      'deletion',
    ],
    default: 'registration',
    required: true,
  },
  userId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

/**
 * Token model for the API
 * @class
 */
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
