const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication operations
 */

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Redirects to Google OAuth for authentication
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to Google OAuth for authentication
 */
router.get('/', authController.googleAuth);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Handles Google OAuth callback
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         description: The authorization code received from Google OAuth
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirects to the client with an access JWT token and expiration time or error message
 */
router.get('/google/callback', authController.googleAuthCallBack);

module.exports = router;