const express = require('express');
const swaggerUi = require('swagger-ui-express');
const specs = require('../swaggerConfig');

const port = process.env.TOMOMI_PORT || 5000;
const colors = ['\x1b[31m', '\x1b[34m', '\x1b[33m', '\x1b[0m'];
const confirmation = `Let's go!!! Tomomi servin' on port ${port}`;

const startServer = (app) => {
  app.use(express.json({ limit: '200mb' }));
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.listen(port, () => {
    for (let i = 0; i < confirmation.length; i++) { // eslint-disable-line no-plusplus
      const color = colors[i % colors.length];
      process.stdout.write(`${color}${confirmation[i]}`);
    }
    process.stdout.write('\n');
  });
};

module.exports = startServer;
