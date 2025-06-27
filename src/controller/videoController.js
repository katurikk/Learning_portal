// src/controllers/videoController.js
const db = require('../config/database');

// GET /api/videos/course/:courseId
exports.getVideosByCourse = (req, res) => {
  const { courseId } = req.params;

  const sql = `SELECT * FROM lessons WHERE course_id = ? ORDER BY lesson_order`;

  db.all(sql, [courseId], (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, videos: rows });
  });
};

// GET /api/videos/:id
exports.getVideoById = (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM lessons WHERE id = ?`;

  db.get(sql, [id], (err, row) => {
    if (err || !row) return res.status(404).json({ success: false, message: 'Video not found' });
    res.json({ success: true, video: row });
  });
};
