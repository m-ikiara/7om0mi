/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const Config = require('./config.utils');
const dbClient = require('./db.utils');
const specs = require('../swaggerConfig');

const colors = ['\x1b[31m', '\x1b[34m', '\x1b[33m', '\x1b[0m'];
const confirmation = `Let's go!!! Tomomi servin' on port ${Config.port}`;

/**
 * startServer initiates a Express server instance
 * @function
 * @param {Object} app - Express object
 * @returns {void}
 */
const startServer = (app) => {
  app.use(express.json({ limit: '200mb' }));
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

  dbClient.connect().then(() => {
    app.listen(Config.port, () => {
      for (let i = 0; i < confirmation.length; i++) { // eslint-disable-line no-plusplus
        const color = colors[i % colors.length];
        process.stdout.write(`${color}${confirmation[i]}`);
      }
      process.stdout.write('\n');
    });
  }).catch((err) => {
    console.error(`Oh no! Tomomi! X(\n\t${err}`);
  });
};

module.exports = startServer;
