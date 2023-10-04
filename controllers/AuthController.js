/* eslint-disable no-unused-vars */
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

// const Buffer = require('buffer');

const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const sha1Hash = crypto.createHash('sha1');

async function getUserByEmail(email) {
  try {
    const userCollection = await dbClient.userCollection();
    const user = await userCollection.findOne({ email });
    return user;
  } catch (error) {
    // Handle errors here
    console.error(error);
    throw error; // You can rethrow the error or handle it as needed
  }
}

const getConnect = async (req, res) => {
  const Data = (req.headers.authorization).split(' ');
  const base64EncodedData = Data[1];
  const decodedData = Buffer.from(base64EncodedData, 'base64').toString('utf8');
  console.log(decodedData);
  const parts = decodedData.split(':');
  const email = parts[0];
  const password = parts[1];
  getUserByEmail(email)
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.error(error);
    });
  // if (!user) {
  //   res.status(401).json({ error: 'UnAuthorized' });
  // } else {
  //   sha1Hash.update(password, 'utf-8');
  //   const computedHash = sha1Hash.digest('hex');
  //   if (user.password === computedHash) {
  //     const uuid = uuidv4().toString();
  //     redisClient.set(`auth_${uuid}`, user._id.toString(), (24 * 60 * 60));
  //     res.status(200).json({ token: uuid });
  //   }
  // }
};

const getDisconnect = async (req, res) => {
  const token = req.headers['x-token'];

  await redisClient.del(`auth_${token}`);
  res.status(204).send();
};

module.exports = { getConnect, getDisconnect };
