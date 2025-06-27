// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerLearner,
  registerEducator,
  login,
} = require('../controller/authController');

router.post('/register', registerLearner);
router.post('/educator/register', registerEducator);
router.post('/login', login);

module.exports = router;
