/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const express = require('express');
const { createInterface } = require('readline');
const swaggerUi = require('swagger-ui-express');
const Config = require('./config.utils');
const dbClient = require('./db.utils');
const specs = require('../swaggerConfig');
const Welcome = require('./welcome.utils');

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * startServer initiates a Express server instance
 * @function
 * @param {Object} app - Express object
 * @returns {void}
 */
const startServer = (app) => {
  app.use(express.json());
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

  process.on('SIGINT' || 'SIGBREAK' || 'SIGKILL', async () => {
    try {
      console.log('Bai Bai! XD');
      await dbClient.disconnect();
      process.exit(0);
    } catch(err) {
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
