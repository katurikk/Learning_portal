// src/controllers/liveClassController.js
const db = require('../config/database');

// Get live class schedule
exports.getSchedule = (req, res) => {
  const { courseId, date, upcoming } = req.query;

  let query = `SELECT * FROM live_classes WHERE 1=1`;
  const params = [];

  if (courseId) {
    query += ` AND course_id = ?`;
    params.push(courseId);
  }

  if (date) {
    query += ` AND DATE(scheduled_at) = DATE(?)`;
    params.push(date);
  }

  if (upcoming === 'true') {
    query += ` AND datetime(scheduled_at) > datetime('now')`;
  }

  query += ` ORDER BY scheduled_at`;

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, liveClasses: rows });
  });
};

// Join live class
exports.joinLiveClass = (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM live_classes WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err || !row) return res.status(404).json({ success: false, message: 'Live class not found' });

    // In real-world, you'd check authentication, limit etc.
    res.json({
      success: true,
      liveClass: {
        joinUrl: row.join_url || 'https://zoom.com/mock-session',
        token: 'mock_access_token',
        chatEnabled: true,
        pollsEnabled: true
      }
    });
  });
};

// Ask question during class
exports.askQuestion = (req, res) => {
  const { id } = req.params;
  const { question, timestamp } = req.body;

  const sql = `
    INSERT INTO doubts (user_id ,
    course_id ,
    lesson_id,
    question ,
    attachments)
    VALUES (?, ?, ?,?,?)
  `;

  db.run(sql, [id, question, timestamp || null], function (err) {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.status(201).json({ success: true, questionId: this.lastID });
  });
};
