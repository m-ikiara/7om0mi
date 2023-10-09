/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');

/**
 * injectRoutes adds routes to the Server instance
 * @function
 * @param {Object} app - Express object
 * @returns {void}
 */
const injectRoutes = (app) => {
  /**
   * @swagger
   * /status:
   *   get:
   *     summary: Is Tomomi okay?
   *     description: Confirms whether Tomomi's up and running.
   *     responses:
   *       200:
   *         description: Tomomi's alive and kickin' =-D
   */
  app.get('/status', (req, res) => AppController.getStatus(req, res));
  /**
   * @swagger
   * /register:
   *   post:
   *     summary: Joy! New friend! =-)
   *     description: Performs new User registration.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: User's email.
   *               password:
   *                 type: string
   *                 description: User's password.
   *     responses:
   *       201:
   *         description: New User joined the party =-D
   *       401:
   *         description: User already joined the party...are you, uoy? XD
   *       500:
   *         description: Tomomi's sick! Fix coming ASAP! ;-(
   */
  app.post('/register', (req, res) => UsersController.registerUser(req, res));
};

module.exports = injectRoutes;
