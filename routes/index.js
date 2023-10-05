const router = require('express').Router();

const { getStatus, getStats } = require('../controllers/AppController');
const { postNew, New } = require('../controllers/UsersController');
const { getConnect, getDisconnect } = require('../controllers/AuthController');

router.get('/status', (req, res) => {
  getStatus(req, res);
});

router.get('/stats', (req, res) => {
  getStats(req, res);
});

router.post('/users', (req, res) => {
  postNew(req, res);
});

router.get('/connect', (req, res) => {
  getConnect(req, res);
});

router.get('/disconnect', (req, res) => {
  getDisconnect(req, res);
});

router.get('/users/me', (req, res) => {
  New(req, res);
});

module.exports = router;
