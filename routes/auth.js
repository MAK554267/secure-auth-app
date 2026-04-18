const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const rateLimit = require('express-rate-limit');
const db = require('../models/userModel');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.File({ filename: 'logs/security.log' }),
    new winston.transports.Console()
  ]
});

const loginLimiter = rateLimit({ windowMs: 15*60*1000, max: 10, message: 'Too many attempts.' });

router.get('/', (req, res) => res.redirect('/login'));
router.get('/register', (req, res) => res.render('register', { error: null }));
router.get('/login', (req, res) => res.render('login', { error: null }));

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!validator.isEmail(email))
    return res.render('register', { error: 'Invalid email address.' });
  if (!validator.isLength(password, { min: 8 }))
    return res.render('register', { error: 'Password must be at least 8 characters.' });
  const safeName = validator.escape(name);
  const hash = await bcrypt.hash(password, 12);
  try {
    db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run(safeName, email, hash);
    logger.info('Registration success', { email, ip: req.ip });
    res.redirect('/login');
  } catch {
    res.render('register', { error: 'Email already registered.' });
  }
});

router.post('/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    logger.warn('Login failed', { email, ip: req.ip });
    return res.render('login', { error: 'Invalid credentials.' });
  }
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
  logger.info('Login success', { email, ip: req.ip });
  res.redirect('/dashboard');
});

router.get('/logout', (req, res) => { res.clearCookie('token'); res.redirect('/login'); });
module.exports = router;
