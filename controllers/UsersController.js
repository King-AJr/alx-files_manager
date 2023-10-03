// import redisClient from '../utils/redis';
import dbClient from '../utils/db';

const postNew = (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).send('Missing email');
  }
  if (!password) {
    res.status(400).send('Missing email');
  }
  if (dbClient.findUserEmail) {
    res.status(400).send('Already exist');
  }
};

module.exports = { postNew };
