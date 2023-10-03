/* eslint-disable import/no-named-as-default */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

const getStatus = (req, res) => {
  res.status(200).json({
    redis: redisClient.isAlive(),
    db: dbClient.isAlive(),
  });
};

const getStats = (req, res) => {
  Promise.all([dbClient.cntUsers(), dbClient.cntFiles()])
    .then(([usersCount, filesCount]) => {
      res.status(200).json({ users: usersCount, files: filesCount });
    });
};

module.exports = { getStats, getStatus };
