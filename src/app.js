// src/app.js
const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
require('./config/database');

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const courseRoutes = require('./routes/courseRoutes');
app.use('/api/courses', courseRoutes);
const videoRoutes = require('./routes/videoRoutes');
app.use('/api/videos', videoRoutes);
const liveClassRoutes = require('./routes/liveClassRoutes');
app.use('/api/live-classes', liveClassRoutes);
const lessonRoutes = require('./routes/lessonRoutes');
app.use('/lessons', lessonRoutes);
const enrollmentRoutes = require('./routes/enrollmentRoutes');
app.use('/api/enrollments', enrollmentRoutes);
const watchHistoryRoutes = require('./routes/watchHistoryRoutes');
app.use('/api/watch-history', watchHistoryRoutes);
const courseReviewRoutes = require('./routes/courseReviewRoutes');
app.use('/api/course-reviews', courseReviewRoutes);
const noteRoutes = require('./routes/notesRoutes');
app.use('/api/notes', noteRoutes);



app.get('/', (req, res) => res.send('Online Learning Platform API Running'));

module.exports = app;
