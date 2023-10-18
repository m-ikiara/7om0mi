/**
 * Ohayogozaimasu! =-D
 * @author Brian M'Ikiara <https://github.com/brian-ikiara>
 */
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Config = require('./config.util');
const Welcome = require('./welcome.util');

/**
 * dbClient handles connection to MongoDB
 * @typedef {Object} dbClient
 */
const dbClient = {
  mongod:  null,
  /**
   * connect Extablishes a connection to MongoDB Mem
   * @function
   * @returns {Object} db - The connection
   */
  async connect() {
    try {
      this.mongod = new MongoMemoryServer({
        instance: {
          dbPath: './data/db',
        },
      });
      await this.mongod.start();
      const mongoUri = `mongodb://${Config.db_host}:${Config.db_port}/${Config.database}`;

      mongoose.set('strictQuery', true);
      this.db = await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      Welcome.beautifyMsg(Welcome.msg[2]);
      Welcome.beautifyMsg(Welcome.msg[0]);
      return this.db;
    } catch (err) {
      console.error('Oh no! Tomomi! X(\n  ', err);
    }
  },
  /**
   * isAlive reports MongoDB's connection status
   * @function
   * @returns {boolean} The connection status
   */
  isAlive() {
    return this.db && this.connection.readyState === 1;
  },
  /**
   * disconnect Terminates connection to MongoDB MemServer
   * @function
   * @returns {void}
   */
  async disconnect() {
    if (this.mongod) {
      await mongoose.connection.close();
      await this.mongod.stop();
    }
  },
};

module.exports = dbClient;
