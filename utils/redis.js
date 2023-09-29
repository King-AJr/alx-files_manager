// utils/redis.js

const redis = require('redis');

class RedisClient {
  constructor(options) {
    this.client = redis.createClient(options);

    this.client.on('error', (err) => {
      console.log('Redis connection client error:', err);
    });
  }


  isAlive() {
      return this.client.connected;
    // return this.client.connect();
    // return this.client.ping();
  }

  async get(key) {
    return await this.client.get(key);
  }

  async set(key, value, duration) {
    return await this.client.set(key, value, duration);
  }

  async del(key) {
    return await this.client.del(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
