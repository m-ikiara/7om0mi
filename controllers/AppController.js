/**
 * Ohayogozaimasu! =-D
 *
 * This will be where the App's Controls will
 * go.
 */
const DBClient = require('../utils/db');

class AppController {
  static getStatus(req, res) {
    res.status(200).json({
      message: 'Joy! Tomomi is alive! =-D',
      db: DBClient.isAlive,
    });
  }
}

module.exports = AppController;
