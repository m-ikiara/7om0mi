/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const express = require('express');
const AppController = require('../controllers/app.controller');
/**
 * appRoutes Adds AppMan routes to the Server instance
 */
const router = express.Router();

/**
 * @swagger
 * /api/app/status:
 *   get:
 *     summary: Is Tomomi okay?
 *     description: Confirms whether Tomomi's up and running.
 *     responses:
 *       200:
 *         description: Tomomi's alive and kickin' =-D
 */
router.get('/status', (req, res) => AppController.getStatus(req, res));

module.exports = router;
