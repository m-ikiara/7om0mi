/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */

/**
 * Stores all of Tomomi's configurations
 * @typedef {Object} Config
 * @property {string} host - Tomomi's host
 * @property {number} port - Tomomi's port
 * @property {string} base_url - Tomomi's url
 * @property {string} db_host - Database connection host
 * @property {number} db_port - Database connection port
 * @property {string} database - Database to connect to
 * @property {string} jwt_secret - Tomomi's JSON Web Token
 */
const Config = {
  colors: [
    '\x1b[31m',
    '\x1b[34m',
    '\x1b[33m',
    '\x1b[0m'
  ],
  host: process.env.TOMOMI_HOST || 'localhost',
  port: process.env.TOMOMI_PORT || 5000,
  base_url: process.env.TOMOMI_URL || '',
  db_host: process.env.TOMOMI_DB_HOST || '127.0.0.1',
  db_port: process.env.TOMOMI_DB_PORT || 27017,
  database: process.env.TOMOMI_DATABASE || 'ohayo_tomomi_desu',
  environment: process.env.NODE_ENV || 'development',
  jwt_secret: process.env.TOMOMI_JWT || '+VBOZ4AQxv0c4mfQgCJlMpQhIVcp1aCrXA30WSVGuS/bh0ff7rkpoBWgoyUznLFP2G/jdZ6A+JQcXjMkBFOh8A==',
};

module.exports = Config;
