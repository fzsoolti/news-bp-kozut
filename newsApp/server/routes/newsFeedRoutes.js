const express = require('express');
const authController = require('../controllers/authController');
const newsfeedController = require('../controllers/newsFeedController');

//API routes
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     NewsFeedPost:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: A news feed post's title.
 *         image:
 *           type: string
 *           description: The image file name of the post (the image saved to uploads/img).
 *         createdAt:
 *           type: date
 *           description: The creation date of the post.
 *         lastModified:
 *           type: date
 *           description: The last modification date of the post.
 *         content:
 *           type: string
 *           description: The content of the post.
 *         createdBy:
 *           $ref: '#/components/schemas/User'
 *           description: The user who created the post.
 *       required:
 *         - title
 *         - image
 *         - createdAt
 *         - lastModified
 *         - content
 *         - createdBy
 */


/**
 * @swagger
 * /api/v1/news:
 *   get:
 *     summary: Get a list of news feed posts.
 *     description: Retrieves a list of news feed posts with optional pagination.
 *     tags:
 *       - NewsFeedPost
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *           maximum: 100
 *         description: The maximum number of results per page (maximum 100).
 *         example: 20
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort order for the results. Comma-separated field names with optional "-" prefix for descending order.
 *         example: createdAt,-title
 *     responses:
 *       '200':
 *         description: A list of news feed posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 results:
 *                   type: integer
 *                   description: The number of results in the current page.
 *                 numOfResults:
 *                   type: integer
 *                   description: The total number of results.
 *                 requestedAt:
 *                   type: string
 *                   description: The timestamp when the request was made.
 *                 data:
 *                   type: object
 *                   properties:
 *                     posts:
 *                       type: array
 *                       description: An array of newsfeed posts.
 *                       items:
 *                         $ref: '#/components/schemas/NewsFeedPost'
 *             example:
 *               status: success
 *               results: 1
 *               numOfResults: 1
 *               requestedAt: '2023-10-07T12:00:00Z'
 *               data:
 *                 posts:
 *                   - _id: '651edac94929cc81db7c829f'
 *                     title: 'Sample News Post'
 *                     image: 'sample-image.jpg'
 *                     createdAt: '2023-10-02T10:15:08Z'
 *                     lastModified: '2023-10-07T12:05:05Z'
 *                     content: '<p>This is a sample news post content.</p>'
 *                     createdBy: '651aba589aaa790bdd25d2dd'
 * 
 *       '500':
 *         description: Internal server error.
 */
router.get('/', newsfeedController.getNewsFeedPosts);

/**
 * @swagger
 * /api/v1/news:
 *   post:
 *     summary: Create a new newsfeed post.
 *     description: Creates a new newsfeed post with an image upload. Requires authentication.
 *     tags:
 *       - NewsFeedPost
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: file
 *                 format: binary
 *                 description: The image file to be uploaded for the post.
 *               title:
 *                 type: string
 *                 description: A news feed post's title.
 *               content:
 *                 type: string
 *                 description: The content of the post.
 *     responses:
 *       '201':
 *         description: The newly created newsfeed post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 data:
 *                   type: object
 *                   properties:
 *                     post:
 *                       $ref: '#/components/schemas/NewsFeedPost'
 *             example:
 *               status: success
 *               data:
 *                 post:
 *                   _id: '651efb8f3d9450be4984ebef'
 *                   title: 'post title'
 *                   image: 'imagename-1696543317026.jpeg'
 *                   content: '<p>This is a sample news post content.</p>'
 *                   createdBy: '651aba589aaa790bdd25d2dd'
 *                   createdAt: '2023-10-05T18:08:15.202Z'
 *                   lastModified: '2023-10-05T18:08:15.202Z'
 *       '400':
 *         description: Bad request, missing image or invalid image format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 message:
 *                   type: string
 *                   description: Error message indicating the missing image or invalid format.
 *             example:
 *               status: 'fail'
 *               message: 'Érvénytelen formátum!'
 *       '401':
 *         description: Unauthorized, user not authenticated / Token verification issue.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 message:
 *                   type: string
 *                   description: Error message indicating the user is not authenticated.
 *             example:
 *               status: 'fail'
 *               message: 'Nincs bejelentkezve!'
 *       '500':
 *         description: Internal server error.
 */
router.post('/',authController.protect, newsfeedController.uploadPostPhoto, newsfeedController.createPost);

/**
 * @swagger
 * /api/v1/news/{id}:
 *   get:
 *     summary: Get a single newsfeed post by ID.
 *     description: Retrieves a single news feed post by its unique ID.
 *     tags:
 *       - NewsFeedPost
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the news feed post to retrieve.
 *         example: 651edac94929cc81db7c829f
 *     responses:
 *       '200':
 *         description: The requested newsfeed post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 data:
 *                   type: object
 *                   properties:
 *                     post:
 *                       $ref: '#/components/schemas/NewsFeedPost'
 *             example:
 *               status: success
 *               data:
 *                 post:
 *                   _id: '651edac94929cc81db7c829f'
 *                   title: 'Sample News Post'
 *                   image: 'sample-image.jpg'
 *                   createdAt: '2023-10-02T10:15:08Z'
 *                   lastModified: '2023-10-07T12:05:05Z'
 *                   content: '<p>This is a sample news post content.</p>'
 *                   createdBy:
 *                     _id: "651ad6c6d2c220602c43388a"
 *                     sub: "118270164677248098014"
 *                     username: "Fazekas Zsolt"
 *                     email: "fzsolti1997@gmail.com"
 *                     pictureURL: "https://lh3.googleusercontent.com/a/ACg8ocIjoStPQLj5rcOf2lOH8OP0dK7HqVSQ_4Sg6kHlcDrchQ=s96-c"
 *                     createdAt: "2023-10-02T12:40:56.651Z"
 *                     lastLogin: "2023-10-06T14:25:48.931Z"
 *       '404':
 *         description: Newsfeed post not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 message:
 *                   type: string
 *                   description: Error message indicating the post was not found.
 *             example:
 *               status: 'fail'
 *               message: 'Nem található (post) ezzel az ID-val!😢'
 *       '500':
 *         description: Internal server error.
 */
router.get('/:id', newsfeedController.getNewsFeedPostById);

/**
 * @swagger
 * /api/v1/news/{id}:
 *   patch:
 *     summary: Update a newsfeed post by ID.
 *     description: Updates a newsfeed post by its unique ID. Requires authentication and checks ownership of the post.
 *     tags:
 *       - NewsFeedPost
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the newsfeed post to update.
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: file
 *                 description: The new image file to be uploaded for the post.
 *               title:
 *                 type: string
 *                 description: A newsfeed post's title.
 *               content:
 *                 type: string
 *                 description: The content of the post.
 *     responses:
 *       '200':
 *         description: The updated newsfeed post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 data:
 *                   type: object
 *                   properties:
 *                     updatedPost:
 *                       $ref: '#/components/schemas/NewsFeedPost'
 *             example:
 *               status: success
 *               data:
 *                 post:
 *                   _id: '651edac94929cc81db7c829f'
 *                   title: 'Sample updated News Post'
 *                   image: 'sample-image.jpg'
 *                   createdAt: '2023-10-02T10:15:08Z'
 *                   lastModified: '2023-10-07T12:05:05Z'
 *                   content: '<p>This is a sample updated post content.</p>'
 *                   createdBy: '651aba589aaa790bdd25d2dd'
 *       '400':
 *         description: Bad request, missing image or invalid image format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 message:
 *                   type: string
 *                   description: Error message indicating the missing image or invalid format.
 *             example:
 *               status: 'fail'
 *               message: 'Érvénytelen formátum!'
 *       '401':
 *         description: Unauthorized, authentication failed or post ownership check failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for unauthorized access.
 *             example:
 *               status: 'fail'
 *               message: 'Csak saját poszt módosítható!'
 *       '404':
 *         description: Not Found, the specified post with the given ID does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the post with the provided ID was not found.
 *             example:
 *               status: 'fail'
 *               message: 'Nem található (post) ezzel az ID-val!😢'
 *       '500':
 *         description: Internal server error.
 */
router.patch('/:id', authController.protect,newsfeedController.checkPostOwner, newsfeedController.uploadPostPhoto, newsfeedController.updateNewsFeedPostById);

/**
 * @swagger
 * /api/v1/news/{id}:
 *   delete:
 *     summary: Delete a newsfeed post by ID.
 *     description: Deletes a newsfeed post by its unique ID. Requires authentication and checks ownership of the post.
 *     tags:
 *       - NewsFeedPost
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the newsfeed post to delete.
 *     responses:
 *       '204':
 *         description: The post was successfully deleted.
 *       '401':
 *         description: Unauthorized, authentication failed or post ownership check failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for unauthorized access.
 *             example:
 *               status: 'fail'
 *               message: 'Csak saját poszt módosítható!'
 *       '404':
 *         description: Not Found, the specified post with the given ID does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the post with the provided ID was not found.
 *             example:
 *               status: 'fail'
 *               message: 'Nem található (post) ezzel az ID-val!😢'
 *       '500':
 *         description: Internal server error.
 */
router.delete('/:id', authController.protect,newsfeedController.checkPostOwner, newsfeedController.deleteNewsFeedPostById);

module.exports = router;