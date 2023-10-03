import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    this.client = new MongoClient(`mongodb://${host}:${port}/${database}`);
    this.client.on('error', (err) => {
      console.log(`MongoDB connection client error: ${err}`);
    });
  }

  isAlive() {
    return this.client.isConnected();
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
}

const dbClient = new DBClient();

export default dbClient;
