const express = require('express');
const authController = require('../controllers/authController');
const newsfeedController = require('../controllers/newsFeedController');

//API routes
const router = express.Router();

router.route('/')
    .post(authController.protect, newsfeedController.uploadPostPhoto, newsfeedController.createPost);

router.route('/:id')
    .get(newsfeedController.getVisitById);

module.exports = router;