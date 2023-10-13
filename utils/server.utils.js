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
    rl.question('Waaaaah? Wanna exit? (y/n): ', async (ans) => {
      switch (ans.toLowerCase()) {
        case 'y':
          try {
            console.log('Shutting down...');
            await dbClient.disconnect();
          } catch (err) {
            console.log('Oh no! Tomomi!', err);
          }
          console.log('Sayonara! ;-(');
          process.exit(0);
          break;

        case 'n':
          console.log('Let\'s continue on... >=-]');
          rl.close();
          break;

        default:
          console.log('Maybe a mouse slip? XD');
          rl.close();
          break;
      };
    });
  });

  Welcome.greetUser();
  dbClient.connect().then(() => {
    app.listen(Config.port, () => {
      Welcome.beautifyMsg(Welcome.msg[1]);
    });
  }).catch((err) => {
    console.error(`Oh no! Tomomi! X(\n\t${err}`);
  });
};

module.exports = startServer;
