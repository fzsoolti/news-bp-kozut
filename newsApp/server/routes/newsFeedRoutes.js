const express = require('express');
const authController = require('../controllers/authController');
const newsfeedController = require('../controllers/newsFeedController');

//API routes
const router = express.Router();

//router.use(authController.protect);

router.route('/')
    .post(newsfeedController.uploadPostPhoto, newsfeedController.createPost)

module.exports = router;