const jwt = require('jsonwebtoken');
const Config = require('../utils/config.util');
const User = require('../models/User.model');

/**
 * AuthController manages all AuthOps.
 * @typedef {Object} AuthController
 */
const AuthController = {
  /**
   * genToken Generates a JWT
   *
   * @async
   * @function
   * @param {Object} res - A response object.
   * @param {string} id - Unique identifier.
   * @param {string} name - Cookie name.
   */
  async genToken(res, id, name) {
    const token = jwt.sign({ regId: id }, Config.jwt_secret, {
      expiresIn: '1h',
    });
    res.cookie(name, token, {
      httpOnly: true,
      secure: Config.environment || false,
      sameSite: 'strict',
      maxAge: 3600,
    });
  },
  /**
   * verifyUser Verifies a User.
   *
   * @async
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @returns {Promise}
   */
  async verifyUser(req, res) {
    try {
      const regUser = await User.findOne({ regId: req.params.id });
      if (!regUser) res.status(404).json({ error: 'Not a user... =-(' });
      res.status(201).json({ msg: 'Alright proceed to the Amenities! =-D' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Oh no! Tomomi! X(' });
    }
  },
};

module.exports = AuthController;
