const { compare } = require('bcrypt');
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
  static async verifyLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) res.status(401).json({ error: 'Nuh-uh! Did someone forget their login? =-D' });
      const regUser = await User.findOne({ email });
      if (!(await compare(password, regUser.password))) res.status(401).json({ error: 'Nuh-uh! Did someone forget their login? =-D' });
      const loginToken = new Token({
        token: jwt.sign({ userId: regUser._id }, Config.jwt_secret),
        tokenType: 'login',
        userId: regUser._id,
      });
      await loginToken.save();
      res.status(201).json('Welcome back to the party! =-D');
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Oh no! Tomomi! X(' });
    }
  }

  /**
   * verifyToken Verifies a JWT.
   *
   * @static
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @param {@callable} next - Point to next function.
   * @returns {Promise}
   */
  static async verifyToken(req, res, next) {
    const authToken = req.body.authorization;
    if (!authToken) res.status(401).json({ error: 'Were you really invited to the party? =-[' });
    const token = authToken.replace('Bearer', '');
    try {
      const decodedToken = await jwt.verify(token, Config.jwt_secret);
      switch (decodedToken.tokenType) {
        case 'login':
          try {
            const userToken = await Token.findOne({ token: token });
            if (!userToken) res.status(401).json({ error: 'Were you really invited to the party? =-[' })
            req.user = { userId };
            res.status(201).json({
              user: decodedToken.userId,
              message: 'Hope you\'re enjoying yourself! =-D', 
            });
          } catch (err) {
            console.error(error);
            res.status(500).json({ error:'Oh no! Tomomi! X(' });
          }
          break;

        case 'reset': // To be implemented soon
          break;

        case 'registration':
          try {
            const regToken = await Token.findOne({ token: token });
            if (!regToken) res.status(401).json({ error: 'Did you get cleared at the gate? =-[' })
            req.user = { userId };
            res.status(201).json({
              user: decodedToken.userId,
              message: 'Welcome to the party! =-D', 
            });
          } catch (err) {
            console.error(error);
            res.status(500).json({ error:'Oh no! Tomomi! X(' });
          }
          break;

        default:
          res.status(401).json({ error: 'Nuh-uh! Not the right invite! =-[' });
          break;
      }
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Oh no! Tomomi! X(' });
    }
  }
}

module.exports = AuthController;
