import redisClient from '../utils/redis';
import dbClient from '../utils/db';

const crypto = require('crypto');

const sha1Hash = crypto.createHash('sha1');

const postNew = async (req, res) => {
  const { email, password } = req.body;
  const user = await ((await dbClient.userCollection()).findOne({ email }));
  if (!email) {
    res.status(400).json({ error: 'Missing Email' });
    return;
  }
  if (!password) {
    res.status(400).json({ error: 'Missing Password' });
    return;
  }
  if (user) {
    res.status(400).json({ error: 'Already exist' });
    return;
  }
  sha1Hash.update(password, 'utf-8');
  const hashPwd = sha1Hash.digest('hex');

  const newUser = await (await dbClient.userCollection()).insertOne(
    { email, password: hashPwd },
  );
  const userId = newUser.insertedId.toString();
  res.status(201).json({ email, userId });
};

const New = async (req, res) => {
  const token = req.headers['x-token'];
  const id = await redisClient.get(token);
  console.log(id);
  const user = await ((await dbClient.userCollection()).findOne({ id }));
  console.log(user);
  if (user) {
    res.status(200).json({ id: user._id, email: user.email });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { postNew, New };
