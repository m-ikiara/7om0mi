/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const { createInterface } = require('readline');
const swaggerUi = require('swagger-ui-express');
const Config = require('./config.util');
const dbClient = require('./db.util');
const specs = require('../../swaggerConfig');
const Welcome = require('./welcome.util');

/**
 * startServer initiates a Express server instance
 * @function
 * @param {Object} app - Express object
 * @returns {void}
 */
const startServer = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.use(cookieParser());

  process.on('SIGINT' || 'SIGBREAK' || 'SIGKILL', async () => {
    try {
      Welcome.beautifyMsg('Bai-bai!XD');
      await dbClient.disconnect();
      process.exit(0);
    } catch (err) {
      console.error('Oh no! Tomomi! X(\n    ', err);
    }
  });

  dbClient.connect().then(() => {
    app.listen(Config.port, () => {
      Welcome.beautifyMsg(Welcome.msg[1]);
    });
  }).catch((err) => {
    console.error(`Oh no! Tomomi! X(\n    ${err}`);
  });
};

module.exports = startServer;
