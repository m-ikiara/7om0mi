/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const { compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { genToken } = require('./auth.controller');
const Config = require('../utils/config.util');
const User = require('../models/User.model');

/**
 * UsersController manages all UserOps.
 * @typedef {Object} UsersController
 */
const UsersController = {
  /**
   * registerUser Registers a new User.
   *
   * @async
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @returns {void}
   */
  async registerUser(req, res) {
    const { username, email, password } = req.body || null;
    try {
      const regUser = await User.findOne({ email });
      if (regUser) res.status(400).json({ error: 'Someone\'s already joined the party! XD' });
      const newUserId = await uuidv4();
      const newUser = await new User({
        username,
        email,
        password,
        regId: newUserId,
      })
      await newUser.save();
      await genToken(res, newUser, 'register');
      res.status(201).json(
        {
          user: {
            email: newUser.email,
            regId: newUser.regId,
          },
          msg: 'Joy! New friend! =-D',
        }
      );
    } catch (err) {
      if (err.code === 11000) res.status(400).json({ error: 'No need to check-in again, enjoy the party =-)' });
      console.error('Oh no! Tomomi! X(\n    ', err);
      res.status(500).json({ error: 'Oh no! Tomomi-chan! X(' });
    }
    return null;
  },
  /**
   * loginUser Login a normal User.
   *
   * @async
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @returns {void}
   */
  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const regUser = await User.findOne({ email });
      if (!regUser) res.status(404).json({ error: 'Oh nein! Not invited to the party... =-(' });
      if (!(await compare(password, regUser.password))) res.status(401).json({ error: 'Try double-checking your login... =-[' });
      await genToken(res, regUser.regId, 'login');
      res.status(200).json({
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
   * logoutUser Performs the Logout procedure.
   *
   * @async
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @returns {void}
   */
  async logoutUser(req, res) {
    res.clearCookie();
    res.status(200).json({ msg: 'Bai-bai! XD' });
  },
  /**
   * getAllUsers Retrieves all Users created.
   *
   * @async
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @returns {void}
   */
  async getAllUsers(req, res) {
    await User.find({})
      .exec()
      .then((users) => {
        if (!users) res.status(404).json({ error: 'No Tasks created yet... =-(' });
        res.status(200).json({
          total: users.length,
          users: users.map((user) => {
            const usrObj = {};
            Object.keys(User.schema.paths).forEach((usrField) => {
              if (usrField !== 'password')  usrObj[usrField] = user[usrField];
            });
            return usrObj;
          }),
        });
      }).catch((err) => {
        console.error('Oh no! Tomomi! X(\n    ', err);
        res.status(500).json({ error: 'Oh no! Tomomi! X(' });
      });
  },
  /**
   * getUserById Retrieves a User based on their identifier.
   *
   * @async
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @returns {void}
   */
  async getUserById(req, res) {
    console.log('Received User: ', req.params.regId);
    await User.findOne({ regId: req.params.regId })
      .exec()
      .then((user) => {
        if (!user) res.status(404).json({ msg: 'Uh, you haven\'t created that yet =-(' });
        res.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          regId: user.regId,
        });
      }).catch((err) => {
        console.error('Oh no! Tomomi! XC\n    ', err);
        res.status(500).json({ error: 'Oh no! Tomomi! X(' });
      });
  },
  /**
   * updateUser Updates a registered User.
   *
   * @async
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @returns {void}
   */
  async updateUser(req, res) {
    console.log('Received User: ', req.params.regId);
    await User.findOneAndUpdate({ regId: req.params.regId }, req.body, { new: true })
      .exec()
      .then((user) => {
        if (!user) res.status(404).json({ msg: 'Sorry, but that guy don\'t exist =-(' });
        res.status(200).json({
          user: user.regId,
          updatedTo: user,
        });
      }).catch((err) => {
        console.error('Oh no! Tomomi! XC\n    ', err);
        res.status(500).json({ error: 'Oh no! Tomomi! X(' });
      });
  },
  /**
   * deleteUser Deletes a registered User.
   *
   * @async
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @returns {void}
   */
  async deleteUser(req, res) {
    const userId = req.params.id;
    console.log('Recieved User: ', userId);
    await User.deleteOne({ _id: userId }).then((user) => {
      if (!user) res.status(404).json({ error: 'That dude don\'t exist... =-(' });
      if (user.deletedCount !== 1) res.status(404).json({ error: 'Delete failed... XC' });
      res.status(200).json({
        user: userId,
        msg: 'Sad to see you go. Sayonara... ;-{',
      });
    }).catch((err) => {
      console.error('Oh no! Tomomi! X(\n    ', err);
      res.status(500).json({ error: 'Oh no! Tomomi! X(' })
    });
  },
};

module.exports = UsersController;
