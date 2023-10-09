/**
 * Ohayogozaimasu! =-D
 *
 * This is where we start Tomomi. So cool! =-)
 */
const express = require('express');
const startServer = require('./utils/server.utils');
const injectRoutes = require('./routes/index');

const tomomi = express();

try {
  injectRoutes(tomomi);
  startServer(tomomi);
} catch (err) {
  console.error(`Oh no! Tomomi! X(\n\tReason: ${err}`);
}

export default tomomi;
