const express = require('express');
const router = express.Router();
const enrollmentController = require('../controller/enrollmentController');

router.post('/', enrollmentController.enrollCourse);
router.get('/user/:userId', enrollmentController.getUserEnrollments);

module.exports = router;
