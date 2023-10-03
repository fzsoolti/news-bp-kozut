const express = require('express');
const authController = require('../controllers/authController');

//API routes
const router = express.Router();

router.use(authController.protect);

router.route('/')
    .post(uploadPostPhoto, newsfeedController.createPost)

module.exports = router;