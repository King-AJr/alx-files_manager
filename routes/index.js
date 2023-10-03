const router = require('express').Router();

const { getStatus, getStats } = require('../controllers/AppController');

router.get('/status', (req, res) => {
  getStatus(req, res);
});

router.get('/stats', (req, res) => {
  getStats(req, res);
});

module.exports = router;
