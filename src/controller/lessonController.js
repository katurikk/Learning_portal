const db = require('../config/database');

// Get lessons for a course
exports.getLessonsByCourse = (req, res) => {
  const { courseId } = req.params;

  const sql = `SELECT * FROM lessons WHERE course_id = ?`;

  db.all(sql, [courseId], (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    res.json({ success: true, lessons: rows });
  });
};

// Create a lesson
exports.createLesson = (req, res) => {
  const { course_id, chapter,title,description,lesson_order,is_free, content, video_url, duration,resources } = req.body;

  const sql = `
    INSERT INTO lessons ( course_id ,
    chapter ,
    title ,
    description ,
    video_url ,
    duration ,
    lesson_order ,
    is_free,
    resources)
    VALUES (?, ?, ?, ?, ?,?,?,?,?)
  `;

  db.run(sql, [course_id, chapter,title,description, video_url, duration,lesson_order,is_free,resources], function (err) {
    if (err) return res.status(500).json({ success: false, message: err.message });

    res.status(201).json({
      success: true,
      message: 'Lesson added',
      lessonId: this.lastID
    });
  });
};
