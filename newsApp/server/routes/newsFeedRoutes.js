const express = require('express');
const authController = require('../controllers/authController');
const newsfeedController = require('../controllers/newsFeedController');

//API routes
const router = express.Router();

router.route('/')
    .get(newsfeedController.getNewsFeedPosts)
    .post(authController.protect, newsfeedController.uploadPostPhoto, newsfeedController.createPost);

router.route('/:id')
    .get(newsfeedController.getNewsFeedPostById)
    .patch(authController.protect,newsfeedController.checkPostOwner, newsfeedController.uploadPostPhoto,newsfeedController.updateNewsFeedPostById)
    .delete(authController.protect,newsfeedController.checkPostOwner, newsfeedController.deleteNewsFeedPostById);

module.exports = router;