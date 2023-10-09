/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const { randomBytes } = require('crypto');
/**
 * jwtSec Generates a new JWT Secret key
 * @function
 * @returns {string} The JWT Secret key
 */
const jwtSecKey = () => randomBytes(64).toString('base64');

console.log(jwtSecKey());
