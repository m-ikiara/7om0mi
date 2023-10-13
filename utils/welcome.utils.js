/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const { readFileSync } = require('fs');
const { image } = require('ascii-art');
const Config = require('./config.utils');
/**
 * Welcome Welcomes a user to Tomomi's CLI.
 * @typedef {Object} welcomeUser
 * @property {Array<string>} msg - Console output messages
 */
const Welcome = {
  msg: [
    `Connected to ${Config.database} at ${Config.db_host} on port ${Config.db_port}... =-D`,
    `Let's go!!! Tomomi servin' on port ${Config.port}`,
    `
Tomomi: The Task Manager v1.0.0-20231006
Copyright \u00A9Brian M'Ikiara <https://github.com/brian-ikiara>  

Kon'nichiwa! Tomomi desu, douzoyoroshiku! XD
We'll have so much fun you and me fwuend. Currently, not much I can do over here,
but more stuff to be implemented then we'll be happy =-).
    `,
  ],
  /**
   * beautifyMsg Adds color to console output
   * @function
   * @param {string} text - The string to be beautified
   * @returns {void}
   */
  beautifyMsg(text) {
    for (let i = 0; i < text.length; i++) { // eslint-disable-line no-plusplus
      const color = Config.colors[i % Config.colors.length];
      process.stdout.write(`${color}${text[i]}`);
    }
    process.stdout.write('\n');
  },
  /**
   * greetUser Displays a welcome message to the User
   * @function
   * @returns {void}
   */
  async greetUser() {
    const imagePath = './assets/img/Tomomi-chan.png';
    await image({
      filepath: imagePath,
      alphabet: 'variant2',
      width: 50,
      }, (err, convertedImage) => {
        if (err) console.error(`Oh no! Tomomi! X(\n  ${err}`);
        console.log(convertedImage);
    });
  },
};

module.exports = Welcome;
