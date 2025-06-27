const express = require('express');
const router = express.Router();
const controller = require('../controller/notesController');

router.post('/', controller.addNote);
router.get('/:userId/:lessonId', controller.getNotesByLesson);
router.delete('/:id', controller.deleteNote);

module.exports = router;