const express = require('express');
const router = express.Router();
const lessonController = require('../controller/lessonController');

router.get('/course/:courseId', lessonController.getLessonsByCourse);
router.post('/', lessonController.createLesson);

module.exports = router;