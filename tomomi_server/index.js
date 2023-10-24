/**
 * Ohayogozaimasu! =-D
 *
 * This is where we start Tomomi. So cool! =-)
 */
const express = require('express');
const startServer = require('./utils/server.util');
const Welcome = require('./utils/welcome.util');

const tomomi = express();

try {
  Welcome.greetUser();
  startServer(tomomi);
} catch (err) {
  console.error(`Oh no! Tomomi! X(\n\tReason: ${err}`);
}

export default tomomi;
