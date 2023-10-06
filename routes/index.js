/**
 * Ohayogozaimasu! =-D
 *
 * This defines Tomomi's routes, bundled neatly as an
 * Object.
 */
const AppController = require('../controllers/AppController');

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
   *       500:
   *         description: Tomomi's sick. Urgent response needed! ;-(
   */
  app.get('/status', (req, res) => AppController.getStatus(req, res));
};

module.exports = injectRoutes;
