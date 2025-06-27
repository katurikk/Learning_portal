const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');

// GET all courses with filters
router.get('/', courseController.getAllCourses);

// GET course details by ID
router.get('/:id', courseController.getCourseById);

// POST enroll in course (auth middleware required later)
router.post('/:id/enroll', courseController.enrollInCourse);

module.exports = router;
