const db = require('../config/database');

// Create a new note
exports.addNote = (req, res) => {
  const { user_id, lesson_id, timestamp, note } = req.body;

  const query = `
    INSERT INTO notes (user_id, lesson_id, timestamp, note)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [user_id, lesson_id, timestamp, note], function (err) {
    if (err) return res.status(500).json({ success: false, message: err.message });

    res.status(201).json({ success: true, message: 'Note added successfully', note_id: this.lastID });
  });
};

// Get notes by user and lesson
exports.getNotesByLesson = (req, res) => {
  const { userId, lessonId } = req.params;

  const query = `
    SELECT * FROM notes
    WHERE user_id = ? AND lesson_id = ?
    ORDER BY timestamp ASC
  `;

  db.all(query, [userId, lessonId], (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    res.json({ success: true, notes: rows });
  });
};

// Delete a note
exports.deleteNote = (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM notes WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ success: false, message: err.message });

    res.json({ success: true, message: 'Note deleted successfully' });
  });
};
