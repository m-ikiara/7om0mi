/**
 * Ohayogozaimasu! =-D
 *
 * This is where we start Tomomi. So cool! =-)
 */
const express = require('express');
const startServer = require('./utils/server');
const injectRoutes = require('./routes/index');

const tomomi = express();

injectRoutes(tomomi);
startServer(tomomi);

export default tomomi;
