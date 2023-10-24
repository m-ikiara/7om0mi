require('dotenv').config();
/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const { createInterface } = require('readline');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const dbClient = require('./db.util');
const injectRoutes = require('../routes/index');
const specs = require('../../swaggerConfig');
const Config = require('./config.util');
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

  app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,POST,PATCH,PUT,DELETE',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }));

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
  injectRoutes(app);
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
    if (Config.NODE_ENV) {
      const __dirname = path.resolve();
      app.use(express.static(path.join(__dirname, '/tomomi_client/dist')));
      app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'tomomi_client', 'dist', 'index.html'));
      });
    }
    app.listen(Config.port, () => {
      Welcome.beautifyMsg(Welcome.msg[1]);
    });
  }).catch((err) => {
    console.error(`Oh no! Tomomi! X(\n    ${err}`);
  });
};

module.exports = startServer;
