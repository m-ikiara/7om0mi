const { jwt } = require('jsonwebtoken');
const Config = require('../utils/config.utils');
const Token = require('../models/Token.model');
const User = require('../models/User.model');

/**
 * AuthController manages all AuthOps.
 * @class
 */
class AuthController {
  /**
   * Verifies a Login.
   *
   * @static
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @returns {Promise}
   */
  static async verifyUser(req, res) {
    try {
      const regUser = await User.findOne({ regId: req.params.regId });
      if (!regUser) res.status(404).json({ error: 'Not a user... =-(' });
      await Token.findOneAndUpdate({ userId: regUser.regId }, {
        token: jwt.sign({ regId: regUser.regId }, Config.jwt_secret),
        tokenType: 'verification',
      }).then(() => {
        res.status(201).json({ msg: 'Alright proceed to the Amenities! =-D' });
      }).catch((err) => {
        console.error('Oh no! Tomomi! X(\n    ', err);
        res.status(500).json({ error: 'Oh no! Tomomi! X(' });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Oh no! Tomomi! X(' });
    }
  }
}

module.exports = AuthController;
