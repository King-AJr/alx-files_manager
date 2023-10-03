const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
  static async getStatus(req, res) {
    const redisAlive = await redisClient.isAlive();
    const dbAlive = await dbClient.isAlive();

    res.status(200).json({
      redis: redisAlive,
      db: dbAlive,
    });
  }

  static async getStats(req, res) {
    const usersCount = await dbClient.cntUsers();
    const filesCount = await dbClient.cntFiles();

    res.status(200).json({
      users: usersCount,
      files: filesCount,
    });
  }
}

module.exports = AppController;

