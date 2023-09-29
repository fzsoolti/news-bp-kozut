const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.googleAuth);
router.get('/google/callback', authController.googleAuthCallBack);

module.exports = router;