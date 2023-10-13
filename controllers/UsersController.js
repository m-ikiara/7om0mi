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
      const regUser = await User.findOne({ email: email });
      if (regUser) return res.status(400).json({ error: `Someone's already joined the party! XD` });
      const hashedPwd = await hash(password, 10);
      const newUserId = await uuidv4();
      const newUser = await new User({
        email: email,
        password: hashedPwd,
        regId: newUserId,
      })
      await newUser.save();
      const regToken = await new Token({
        token: await jwt.sign({ email: email }, Config.jwt_secret),
        tokenType: 'registration',
        userId:   newUser.regId,
      });
      await regToken.save();
      res.status(200).json({
        token: regToken,
        message: 'Joy! New friend! =-D',
      });
    } catch (err) {
      if (typeof(err) === MongoServerError && err.code === 11000) res.status(400).json({ error: 'No need to check-in again, enjoy the party =-)' });
      console.error('Oh no! Tomomi! X(\n    ', err);
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
      await Token.findOneAndUpdate({ userId: regUser.regId }, {
        token: jwt.sign({ userId: regUser.regId, email: regUser.email }, Config.jwt_secret),
        tokenType: 'login',
      });
      res.status(201).json({
        user: regUser.regId,
        message: 'Welcome back to the party! =-D',
      });
    } catch (err) {
      if (err.code === 11000) res.status(400).json({ error: 'No need to check-in again, enjoy the party =-)' });
      console.error('Oh no! Tomomi! X(\n    ', err);
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
   * @returns {void}
   */
  async deleteUser(req, res) {
    const regId = req.params.regId;
    console.log('Recieved User: ', regId);
    await User.findOneAndDelete({ regId: regId }).then(() => {
      Token.findOneAndUpdate({ userId: regId }, {
        token: jwt.sign({ regId: regId }, Config.jwt_secret),
        tokenType: 'deletion',
      });
      res.status(200).json({
        user: regId,
        msg: 'Sad to see you go. Sayonara... ;-{',
      });
    }).catch((err) => {
      console.error('Oh no! Tomomi! X(\n    ', err);
      res.status(500).json({ error: 'Oh no! Tomomi! X(' })
    });
  },
}

module.exports = UsersController;
