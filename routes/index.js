/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const appRoutes = require('./app.routes');
const userRoutes = require('./users.routes');

/**
 * injectRoutes Adds All routes to the Server instance
 * @function
 * @param {Object} app - Express object
 * @returns {void}
 */
const injectRoutes = (app) => {
  app.use('/app', appRoutes);
  app.use('/users', userRoutes);
};

module.exports = injectRoutes;
