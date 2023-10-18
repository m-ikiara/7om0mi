/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const express = require('express');
const AuthController = require('../controllers/auth.controller');
const UsersController = require('../controllers/users.controller');

/**
 * userRoutes Adds UsrMan routes to the Server instance
 */
const router = express.Router();

/**
 * @swagger
 * /api/users/register:
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
 *               username:
 *                 type: string
 *                 default: 6utt3rd09
 *                 description: Unique username.
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
router.post('/register', (req, res) => {
  console.log('Creating new User... =-D');
  UsersController.registerUser(req, res)
    .then(() => {
      if (res.statusCode === 201) console.log('Yay! New fwuend! =-D');
      else if (res.statusCode === 400) console.log('No need to check in again, enjoy the party... =-)');
    }).catch((err) => {
      console.error('Oh no! Tomomi!\n  ', err);
    });
});
/**
 * @swagger
 * /api/users/login:
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
router.post('/login', (req, res) => {
  console.log('Attempting to login... =-D');
  UsersController.loginUser(req, res)
    .then(() => {
      if (res.statusCode === 200) console.log('Yay! Welcome back! =-D');
      else if (res.statusCode === 400) console.log('No need to check in again, enjoy the party! =-)');
      else if (res.statusCode === 404) console.log('Not invited! Register first! =-[');
    }).catch((err) => {
      console.error(`Oh no! Tomomi! X(\n    ${err}`);
    });
});
/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Bai-bai! XD
 *     description: Performs a User logout via deleting the JWT.
 *     responses:
 *       200:
 *         description: Bai-bai! XD
 *       500:
 *         description: Oh no! Tomomi! X(
 */
router.post('/logout', (req, res) => {
  console.log('Attempting to logout... =-D');
  UsersController.logoutUser(req, res)
    .then(() => {
      if (res.statusCode === 200) console.log('Bai-bai! XD');
    }).catch((err) => {
      console.error(`Oh no! Tomomi! X(\n    ${err}`);
    });
});
/**
 * @swagger
 * paths:
 *   /api/users/get:
 *     get:
 *       summary: These are all Tomomi's friends... =-D
 *       description: Displays all Users created.
 *       responses:
 *         200:
 *           description: Success! =-D
 *         404:
 *           description: No Users created yet... =-(
 *         500:
 *           description: Oh no! Tomomi! X(
 */
router.get('/get', (req, res) => {
  console.log('Getting all Users... =-D');
  UsersController.getAllUsers(req, res)
    .then(() => {
      if (res.statusCode === 200) console.log('Success! =-D');
      else if (res.statusCode === 404) console.log('No Users created yet... =-[');
    })
    .catch((err) => {
      console.error(`Oh no! Tomomi! X(\n    ${err}`);
    });
});
/**
 * @swagger
 * paths:
 *   /api/users/get/{regId}:
 *     get:
 *       summary: Dis U? =-D
 *       description: Displays a User by their regId.
 *       parameters:
 *         -  in: path
 *            name: regId
 *            required: true
 *            schema:
 *              type: string
 *            description: User Id
 *       responses:
 *         200:
 *           description: Success! =-D
 *         404:
 *           description: No Tasks created yet... =-(
 *         500:
 *           description: Oh no! Tomomi! X(
 */
router.route('/get/:regId')
  .get((req, res) => {
    console.log(`Getting User ${req.params.regId}... =-D`);
    UsersController.getUserById(req, res)
      .then(() => {
        if (res.statusCode === 200) console.log('Success! =-D');
        else if (res.statusCode === 404) console.log(`No User ${req.params.regId}... =-[`);
      })
      .catch((err) => {
        console.error(`Oh no! Tomomi! X(\n    ${err}`);
      });
});
/**
 * @swagger
 * /api/users/update/{regId}:
 *   put:
 *     summary: Waaah? You wanna change who you are? =-O
 *     description: Allows User to update their profile.
 *     parameters:
 *       -  in: path
 *          name: regId
 *          required: true
 *          schema:
 *            type: string
 *          description: User Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Unique username.
 *               email:
 *                 type: string
 *                 description: User's email.
 *               password:
 *                 type: string
 *                 description: User's password.
 *     responses:
 *       200:
 *         description: Like the new you! ;-D
 *       404:
 *         description: Can't do that! XC
 *       500:
 *         description: Oh no! Tomomi! X(
 */
router.route('/update/:regId')
  .put((req, res) => {
    console.log(`Updating User ${req.params.regId}... =-D`);
    UsersController.updateUser(req, res)
      .then(() => {
        if (res.statusCode === 200) console.log('Like the new look! ;-D');
        else if (res.statusCode === 404) console.log('Seems I can\'t do that! XC');
      }).catch((err) => {
        console.error(`Oh no! Tomomi! X(\n    ${err}`);
      });
});
/**
 * @swagger
 * /api/users/delete/{regId}:
 *   delete:
 *     summary: Sad to see you leave... Sayonara ;-{
 *     description: Performs a User login session.
 *     parameters:
 *       -  in: path
 *          name: regId
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
router.route('/delete/:regId')
  .post((req, res) => {
    console.log('Ummm...deleting User...');
    UsersController.deleteUser(req, res)
      .then(() => {
        if (res.statusCode === 200) console.log('Sayo...nara... ;-{');
        if (res.statusCode === 401) console.log('Bad! Don\'t scare me like that! >=-[');
        if (res.statusCode === 404) console.log('They are not around! I\'ll tell them whatchudoin... =-O');
        if (res.statusCode === 500) console.log('Oh no! Tomomi! X(');
      }).catch((err) => {
        console.error(`Oh no! Tomomi! X(\n    ${err}`);
      });
});

module.exports = router;
