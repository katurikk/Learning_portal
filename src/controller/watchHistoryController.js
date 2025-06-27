const db = require('../config/database');

// Save or update watch history
exports.saveWatchHistory = (req, res) => {
  const { user_id, lesson_id, watched_duration, total_duration, completed } = req.body;

  const query = `
    INSERT INTO watch_history (user_id, lesson_id, watched_duration, total_duration, completed, last_watched)
    VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(user_id, lesson_id)
    DO UPDATE SET
      watched_duration = excluded.watched_duration,
      total_duration = excluded.total_duration,
      completed = excluded.completed,
      last_watched = CURRENT_TIMESTAMP
  `;

  db.run(query, [user_id, lesson_id, watched_duration, total_duration, completed], function (err) {
    if (err) return res.status(500).json({ success: false, message: err.message });

    res.status(200).json({ success: true, message: 'Watch history updated' });
  });
};

// Get watch history for a user
exports.getWatchHistory = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT w.*, l.title, l.chapter
    FROM watch_history w
    JOIN lessons l ON w.lesson_id = l.id
    WHERE w.user_id = ?
    ORDER BY w.last_watched DESC
  `;

  db.all(query, [userId], (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    res.json({ success: true, history: rows });
  });
};
