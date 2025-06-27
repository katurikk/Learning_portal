// src/routes/liveClassRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controller/liveClassController');

// GET live class schedule
router.get('/schedule', controller.getSchedule);

// POST join live class (requires authentication later)
router.post('/:id/join', controller.joinLiveClass);

// POST ask question during live class
router.post('/:id/questions', controller.askQuestion);

module.exports = router;
