const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

//API routes
const router = express.Router();

router.use(authController.protect);

router.get('/me', userController.getMe, userController.getUserById);

module.exports = router;