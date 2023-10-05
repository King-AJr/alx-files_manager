const { MongoClient } = require('mongodb');

/**
 * Represents a MongoDB client.
 */
class DBClient {
  /**
   * Creates a new DBClient instance.
   */
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.status = false;
    this.client = new MongoClient(dbURL);
    this.client.connect();
    this.client.on('error', (err) => {
      console.log(`MongoDB connection client error: ${err}`);
    });
    this.client.on('open', () => {
      console.log('MongoDB connection open');
      this.status = true;
    });
    this.client.on('close', () => {
      console.log('MongoDB connection closed');
      this.status = false;
    });
    this.client.on('error', (err) => {
      console.log(`MongoDB connection client error: ${err}`);
    });
  }

  isAlive() {
    return this.status;
  }

  async cntUsers() {
    const collection = this.client.db().collection('users');
    const count = await collection.countDocuments();
    return count;
  }

  async cntFiles() {
    const collection = this.client.db().collection('files');
    const count = await collection.countDocuments();
    return count;
  }

  async userCollection() {
    return this.client.db().collection('users');
  }
}

const dbClient = new DBClient();

export default dbClient;
