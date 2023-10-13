const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoServerError } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Config = require('../utils/config.utils');
const Token = require('../models/Token.model');
const User = require('../models/User.model');

/**
 * UsersController manages all UserOps.
 * @typedef {Object} UsersController
 */
const UsersController = {
  /**
   * registerUser Registers a new User.
   *
   * @static
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @returns {void}
   */
  async registerUser(req, res) {
    const { email, password } = req.body || null;
    try {
      const regUser = await User.findOne({ email });
      if (regUser) return res.status(400).json({ error: `Someone's already joined the party! XD` });
      const hashedPwd = await hash(password, 10);
      const newUser = new User({
        email,
        password: hashedPwd,
      }).save();
      const newUserId = uuidv4();
      const regToken = await new Token({
        token: await jwt.sign({ userId: newUserId, email: email }, Config.jwt_secret),
        tokenType: 'registration',
        userId: newUserId,
      });
      await regToken.save();
      res.status(200).json({
        token: regToken,
        message: 'Joy! New friend! =-D',
      });
    } catch (err) {
      if (typeof(err) === MongoServerError && err.code === 11000) res.status(400).json({ error: 'No need to check-in again, enjoy the party =-)' });
      console.error('Oh no! Tomomi! X(', err);
      res.status(500).json({ error: 'Oh no! Tomomi-chan! X(' });
    }
    return null;
  },
  /**
   * loginUser Login a normal User.
   *
   * @static
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @returns {void}
   */
  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const regUser = await User.findOne({ email });
      if (!regUser) return res.status(404).json({ error: 'Oh nein! Not invited to the party... =-(' });
      if (!(await compare(password, regUser.password))) res.status(401).json({ error: 'Try double-checking your login... =-[' });
      const loginToken = await new Token({
        token: jwt.sign({ userId: regUser._id, email: regUser.email }, Config.jwt_secret),
        tokenType: 'login',
        userId: regUser._id,
      });
      await loginToken.save();
      res.status(201).json({
        token: loginToken,
        message: 'Welcome back to the party! =-D',
      });
    } catch (err) {
      if (err.code === 11000) res.status(400).json({ error: 'No need to check-in again, enjoy the party =-)' });
      console.error('Oh no! Tomomi! X(', err);
      res.status(500).json({ error: 'Oh no! Tomomi-chan! X(' });
    }
  },
  /**
   * deleteUser Deletes a registered User.
   *
   * @static
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @param {string} userId - User to be deleted.
   * @returns {void}
   */
  async deleteUser(req, res, userId) {
    try {
      await User.findByIdAndDelete(userId);
      res.status(200).json({
        user: userId,
        msg: 'Sad to see you go. Sayonara... ;-{',
      });
    } catch (err) {
      console.error('Oh no! Tomomi! X(', err);
      res.status(500).json({ error: 'Oh no! Tomomi! X(' })
    }
  },
}

module.exports = UsersController;
