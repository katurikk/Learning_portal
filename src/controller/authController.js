// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET || 'supersecretkey';

exports.registerLearner = (req, res) => {
  const { name, email, password, mobile, targetExam, preferredLanguage } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = `
    INSERT INTO users (name, email, password, mobile, targetExam, preferredLanguage, role)
    VALUES (?, ?, ?, ?, ?, ?, 'learner')
  `;

  db.run(query, [name, email, hashedPassword, mobile, targetExam, preferredLanguage], function (err) {
    if (err) return res.status(500).json({ success: false, message: err.message });

    const token = jwt.sign({ id: this.lastID, role: 'learner' }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      userId: this.lastID,
      token,
    });
  });
};

exports.registerEducator = (req, res) => {
  const { name, email, password, mobile, subjects, qualification, experience, bio } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = `
    INSERT INTO educators (name, email, password, mobile, subjects, qualification, experience, bio,role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'educator')
  `;

  db.run(query, [name, email, hashedPassword, mobile, JSON.stringify(subjects), qualification, experience, bio], function (err) {
    if (err) return res.status(500).json({ success: false, message: err.message });

    const token = jwt.sign({ id: this.lastID, role: 'educator' }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      message: 'Educator registered',
      userId: this.lastID,
      token,
    });
  });
};

exports.login = (req, res) => {
  const { email, password, role } = req.body;

  const table = role === 'educator' ? 'educators' : 'users';

  const query = `SELECT * FROM ${table} WHERE email = ?`;

  db.get(query, [email], (err, user) => {
    if (err || !user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Incorrect password' });

    const token = jwt.sign({ id: user.id, role: user.role },process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      message: 'Login successful',
      userId: user.id,
      token,
    });
  });
};
