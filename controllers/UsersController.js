const { hash } = require('bcrypt');
const { jwt } = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Config = require('../utils/config.utils');
const Token = require('../models/Token.model');
const User = require('../models/User.model');

/**
 * UsersController manages all UserOps.
 * @class
 */
class UsersController {
  /**
   * Registers a new User.
   *
   * @static
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @returns {void}
   */
  static async registerUser(req, res) {
    try {
      const email = req.body ? req.body.email : null;
      const password = req.body ? req.body.password : null;
      if (!email || !password) return res.status(401).json({ error: 'Nuh-uh! Did someone forget their password? =-O' });
      const regUser = await User.findOne({ email });
      if (regUser) return res.status(400).json({ error: `${email} already joined the party! XD` });
      const newUserId = uuidv4();
      const hashedPwd = await hash(password, 10);
      const newUser = new User({
        _id: newUserId,
        email,
        password: hashedPwd,
      });
      await newUser.save();
      const regToken = new Token({
        token: jwt.sign({ newUserId }, Config.jwt_secret),
        tokenType: 'registration',
        newUserId,
      });
      await regToken.save();
      res.status(200).json({
        email,
        message: 'Joy! New friend! =-D',
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Oh no! Tomomi-chan! X(' });
    }
    return null;
  }
}

module.exports = UsersController;
