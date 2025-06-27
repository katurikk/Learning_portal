const express = require('express');
const router = express.Router();
const controller = require('../controller/courseReviewController');

router.post('/', controller.addOrUpdateReview);
router.get('/course/:courseId', controller.getReviewsByCourse);

module.exports = router;
