const mongoose = require('mongoose');

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'ohayo_tomomi_desu';

class DBClient {
  constructor() {
    mongoose.set('strictQuery', true);
    mongoose.connect(`mongodb://${host}:${port}/${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.connection = mongoose.connection;

    this.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    this.connection.once('open', () => {
      console.log(`Connected to MongoDB at ${host}:${port}/${database}`);
    });
  }

  isAlive() {
    return this.connection.readyState === 1; // 1 means connected
  }
}

module.exports = DBClient;
