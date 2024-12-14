const express = require('express');
const router = express.Router();
const verifyJWT = require('../Middleware/verifyJWT');
const roleCheck = require('../Middleware/roleCheck');
const userController = require('../Controllers/userController');
const asyncHandler = require('express-async-handler');
const multer = require('multer');



router.get('/',verifyJWT,roleCheck, asyncHandler(userController.getAllUsers));
router.get('/user/:id',verifyJWT,roleCheck, asyncHandler(userController.getUser));
router.get('/user',verifyJWT,roleCheck, asyncHandler(userController.getUser));
router.delete('/:id',verifyJWT,roleCheck, asyncHandler(userController.deleteUser));


// router.put('/update/:id',verifyJWT,roleCheck, asyncHandler(userController.updateUser));


module.exports = router;




/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users.
 *     description: Get a list of all users.
 *     tags:
 *       - Users
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully.
 *       500:
 *         description: Internal server error.

 * /users/user/{id}:
 *   get:
 *     summary: Get user by ID.
 *     description: Get a user by providing their user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: User retrieved successfully.
 *       400:
 *         description: Bad request. Check the request parameters and data.
 *       500:
 *         description: Internal server error.

 * /users/user:
 *   get:
 *     summary: Get signed in user.
 *     description: Get details of signed in user.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         schema:
 *           type: string
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: User retrieved successfully.
 *       400:
 *         description: Bad request. Check the request parameters and data.
 *       500:
 *         description: Internal server error.

 * /users/update/{id}:
 *   put:
 *     summary: Update user by ID.
 *     description: Update a user by providing their user ID and the new username or email.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email to update to.
 *               username:
 *                 type: string
 *                 description: The username to update to.
 *               phoneNumber:
 *                 type: string
 *                 description: The phoneNumber to update to.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Bad request. Check the request parameters and data.
 *       500:
 *         description: Internal server error.
 
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID.
 *     description: Delete a user by providing their user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       400:
 *         description: Bad request. Check the request parameters and data.
 *       500:
 *         description: Internal server error.
 *       401:
 *         description: Unauthorized. You are not authorized to delete users.

 */
