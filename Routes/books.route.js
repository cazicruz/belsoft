const express = require('express');
const router = express.Router();
const verifyJWT = require('../Middleware/verifyJWT');
const roleCheck = require('../Middleware/roleCheck');
const asyncHandler = require('express-async-handler');
const bookController =require('../Controllers/booksController')
const multer = require('multer');
const {multerConfig} = require('../Config/multerConfig');

const upload = multer({storage: multerConfig});

router.get('/',verifyJWT,asyncHandler(bookController.getAllBooks));
router.get('/available',verifyJWT,asyncHandler(bookController.getAllAvailableBooks));
router.post('/add',verifyJWT,asyncHandler(bookController.addBook));
router.post('/borrow',verifyJWT,asyncHandler(bookController.borrowBook));
router.put('/return',verifyJWT,asyncHandler(bookController.returnBook));
router.put('/:id',verifyJWT,asyncHandler(bookController.updateBook));
router.delete('/:id',verifyJWT,asyncHandler(bookController.deleteBook));



module.exports = router;



/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books.
 *     description: Retrieve a list of all books in the library.
 *     tags:
 *       - Books
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: List of books retrieved successfully.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /books/available:
 *   get:
 *     summary: Get all available books.
 *     description: Retrieve a list of books that are currently available for borrowing.
 *     tags:
 *       - Books
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: List of available books retrieved successfully.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /books/add:
 *   post:
 *     summary: Add a new book to the library.
 *     description: Add a book by providing its title, description, author, ISBN, and publication date.
 *     tags:
 *       - Books
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               author:
 *                 type: string
 *               ISBN:
 *                 type: string
 *               publishedAt:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Book added successfully.
 *       400:
 *         description: Missing required fields or book already exists.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /books/borrow:
 *   post:
 *     summary: Borrow a book from the library.
 *     description: Borrow a book by providing the book ID and user ID.
 *     tags:
 *       - Books
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book borrowed successfully.
 *       400:
 *         description: Missing required fields or book not available.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /books/return:
 *   put:
 *     summary: Return a borrowed book.
 *     description: Return a book by providing the book ID and user ID.
 *     tags:
 *       - Books
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book returned successfully.
 *       400:
 *         description: Missing required fields or invalid data.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update book details.
 *     description: Update details of a book by providing the book ID and new values for its fields.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               author:
 *                 type: string
 *               ISBN:
 *                 type: string
 *               publishedAt:
 *                 type: string
 *                 format: date
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Book updated successfully.
 *       400:
 *         description: Missing required fields or invalid data.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book.
 *     description: Delete a book by providing its ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to delete.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Book deleted successfully.
 *       400:
 *         description: Invalid book ID or error deleting book.
 *       500:
 *         description: Internal server error.
 */
