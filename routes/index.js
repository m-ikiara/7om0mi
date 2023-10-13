/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const AppController = require('../controllers/AppController');
const AuthController = require('../controllers/AuthController');
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
   *                 default: dog@butter.com
   *                 description: User's email.
   *               password:
   *                 type: string
   *                 default: g1G4n!gg3r69
   *                 description: User's password.
   *     responses:
   *       200:
   *         description: New User joined the party =-D
   *       400:
   *         description: User already joined the party...are you, uoy? XD
   *       500:
   *         description: Oh no! Tomomi! X(
   */
  app.post('/register', (req, res) => {
    UsersController.registerUser(req, res)
      .then(() => {
        console.log('Creating new User... =-D');
        if (res.statusCode === 200) console.log('Yay! New fwuend! =-D');
        else if (res.statusCode === 400) console.log('No need to check in again, enjoy the party... =-)');
      }).catch((err) => {
        console.error('Oh no! Tomomi!\n  ', err);
      });
  });
  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Welcome back friend! =-D
   *     description: Performs a User login session.
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
   *                 default: dog@butter.com
   *               password:
   *                 type: string
   *                 description: User's password.
   *                 default: g1G4n!gg3r69
   *     responses:
   *       201:
   *         description: Welcome back to the party! =-D 
   *       401:
   *         description: Oh nein! Not invited to the party... =-( 
   *       404:
   *         description: Not invited! Register first! =-[ 
   *       500:
   *         description: Oh no! Tomomi! X(
   */
  app.post('/login', (req, res) => {
    UsersController.loginUser(req, res)
      .then(() => {
        console.log('Attempting to login... =-D');
        if (res.statusCode === 201) console.log('Yay! Welcome back! =-D');
        else if (res.statusCode === 400) console.log('No need to check in again, enjoy the party! =-)');
        else if (res.statusCode === 404) console.log('Not invited! Register first! =-[');
      }).catch((err) => {
        console.error(`Oh no! Tomomi! X(\n  `, err);
      });
  });
  /**
   * @swagger
   * /users/:userId/delete_account:
   *   delete:
   *     summary: Sad to see you leave... Sayonara ;-{
   *     description: Performs a User login session.
   *     parameters:
   *       -  in: path
   *          name: userId
   *          required: true
   *          schema:
   *            type: string
   *          description: userId
   *     responses:
   *       200:
   *         description: Sad to see you go. Sayonara... ;-{
   *       401:
   *         description: Whatchudoin\'? Is someone being bad? >=-[
   *       404:
   *         description: Aaah! Not in the reservation list! =-O 
   *       500:
   *         description: Oh no! Tomomi! X(
   */
  app.delete('/users/:userId/delete_account', (req, res) => {
    AuthController.verifyLogin(req, res);
    const userId = req.params.userId;
    UsersController.deleteUser(req, res, userId)
      .then(() => {
        console.log('Ummm...deleting User...');
        if (res.statusCode === 200) console.log('Sayo...nara... ;-{');
        if (res.statusCode === 401) console.log('Bad! Don\'t scare me like that! >=-[');
        if (res.statusCode === 404) console.log('They are not around! I\'ll tell them whatchudoin... =-O');
      }).catch((err) => {
        console.error(`Oh no! Tomomi! X(\n  `, err);
      });
  });
};

module.exports = injectRoutes;
