const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

router.get('/dashboard', verifyToken, (req, res) => res.render('dashboard', { user: req.user }));
router.get('/admin', verifyToken, requireRole('admin'), (req, res) => res.render('admin', { user: req.user }));
module.exports = router;
