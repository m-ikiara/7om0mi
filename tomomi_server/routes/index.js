/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const appRoutes = require('./app.route');
const userRoutes = require('./users.route');
const taskRoutes = require('./tasks.route');

/**
 * injectRoutes Adds All routes to the Server instance
 * @function
 * @param {Object} app - Express object
 * @returns {void}
 */
const injectRoutes = (app) => {
  app.use('/api/app', appRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/tasks', taskRoutes);
};

module.exports = injectRoutes;
