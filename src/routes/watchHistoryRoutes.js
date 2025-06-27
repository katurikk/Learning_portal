const express = require('express');
const router = express.Router();
const watchHistoryController = require('../controller/watchHistoryController');

router.post('/', watchHistoryController.saveWatchHistory);
router.get('/user/:userId', watchHistoryController.getWatchHistory);

module.exports = router;
