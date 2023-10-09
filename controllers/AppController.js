/**
 * AppController handles Tomomi's Overall functionality.
 * @class
 */
class AppController {
  /**
   * Get the status of the application.
   *
   * @static
   * @function
   * @param {Object} req - A request object.
   * @param {Object} res - A response object.
   * @returns {void}
   */
  static getStatus(req, res) {
    res.status(200).json({
      message: 'Joy! Tomomi is alive! =-D',
    });
  }
}

module.exports = AppController;
