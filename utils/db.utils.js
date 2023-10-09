/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Config = require('./config.utils');

/**
 * dbClient handles connection to MongoDB
 * @typedef {Object} dbClient
 */
const dbClient = {
  async connect() {
    try {
      this.colors = ['\x1b[31m', '\x1b[34m', '\x1b[33m', '\x1b[0m'];
      this.confirmation = `Connected to ${Config.database} at ${Config.db_host} on port ${Config.db_port}... =-D`,
      this.mongod = await MongoMemoryServer.create();
      const getUri = this.mongod.getUri();

      await mongoose.set('strictQuery', true);
      this.db = await mongoose.connect(getUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      for (let i = 0; i < this.confirmation.length; i++) { // eslint-disable-line no-plusplus
        const color = this.colors[i % this.colors.length];
        process.stdout.write(`${color}${this.confirmation[i]}`);
      }
      process.stdout.write('\n');
      return this.db;
    } catch (err) {
      console.error(`Oh no! Tomomi! X(\n\t`, err);
    }
  },
  /**
   * isAlive reports MongoDB's connection status
   * @function
   * @returns {boolean} The connection status
   */
  isAlive() {
    return this.connection.readyState === 1;
  },
}

module.exports = dbClient;
