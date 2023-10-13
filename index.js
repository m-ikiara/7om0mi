/**
 * Ohayogozaimasu! =-D
 *
 * This is where we start Tomomi. So cool! =-)
 */
const express = require('express');
const startServer = require('./utils/server.utils');
const injectRoutes = require('./routes/index');
const Welcome = require('./utils/welcome.utils');

const tomomi = express();

try {
  Welcome.greetUser();
  startServer(tomomi);
  injectRoutes(tomomi);
} catch (err) {
  console.error(`Oh no! Tomomi! X(\n\tReason: ${err}`);
}

export default tomomi;
