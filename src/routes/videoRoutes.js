// src/routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const videoController = require('../controller/videoController');

// Get videos for a specific course
router.get('/course/:courseId', videoController.getVideosByCourse);

// Get a single video by ID
router.get('/:id', videoController.getVideoById);

module.exports = router;
