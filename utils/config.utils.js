/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */

/**
 * Stores all of Tomomi's configurations
 * @typedef {Object} Config
 * @property {number} port - Tomomi's port
 * @property {string} db_host - Database connection host
 * @property {number} db_port - Database connection port
 * @property {string} database - Database to connect to
 * @property {string} jwt_secret - Tomomi's JSON Web Token
 */
const Config = {
  port: process.env.TOMOMI_PORT || 5000,
  db_host: process.env.TOMOMI_DB_HOST || 'localhost',
  db_port: process.env.TOMOMI_DB_PORT || 27017,
  database: process.env.TOMOMI_DATABASE || 'ohayo_tomomi_desu',
  jwt_secret: process.env.TOMOMI_JWT || '+VBOZ4AQxv0c4mfQgCJlMpQhIVcp1aCrXA30WSVGuS/bh0ff7rkpoBWgoyUznLFP2G/jdZ6A+JQcXjMkBFOh8A==',
};

module.exports = Config;
