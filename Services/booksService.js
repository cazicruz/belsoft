const Books = require('../Models/bookModel');
const History = require('../Models/historyModel');
const Users = require('../Models/userModel');
const mongoose = require('mongoose');
const ApiError = require('../Utils/apiError'); // Import the custom error class

const addBook = async (bookObj) => {
    try {
        const oldBook = await Books.findOne({
            title: bookObj.title,
            ISBN: bookObj.ISBN,
            author: bookObj.author
        });

        if (oldBook) throw new ApiError(400, "Book already exists");

        const book = new Books(bookObj);
        await book.save();
        return book;
    } catch (error) {
        throw error instanceof ApiError ? error : new ApiError(500, `Error adding book: ${error.message}`);
    }
};

const getAvailableBooks = async () => {
    try {
        return await Books.find({ status: 'available' }).exec();
    } catch (error) {
        throw new ApiError(500, `Error fetching available books: ${error.message}`);
    }
};

const updateBookStatus = async (_id, status) => {
    try {
        const book = await Books.findByIdAndUpdate(_id, { status }, { new: true }).exec();
        if (!book) throw new ApiError(404, "Book not found");
        return book;
    } catch (error) {
        throw error instanceof ApiError ? error : new ApiError(500, `Error updating book status: ${error.message}`);
    }
};

const updateBook = async (_id, updateObj) => {
    try {
        const book = await Books.findByIdAndUpdate(_id, updateObj, { new: true }).exec();
        if (!book) throw new ApiError(404, "Book not found");
        return book;
    } catch (error) {
        throw error instanceof ApiError ? error : new ApiError(500, `Error updating book: ${error.message}`);
    }
};

const deleteBook = async (id) => {
    try {
        const book = await Books.findByIdAndDelete(id).exec();
        if (!book) throw new ApiError(404, "Book not found");
        return book;
    } catch (error) {
        throw error instanceof ApiError ? error : new ApiError(500, `Error deleting book: ${error.message}`);
    }
};

const borrowBook = async (userId, bookId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await Users.findById(userId);
        const book = await Books.findById(bookId);

        if (!user) throw new ApiError(404, 'Invalid user');
        if (!book) throw new ApiError(404, "Book does not exist");
        if(book.status === 'borrowed') throw new ApiError(400, "This Book has been borrowed");

        const history = new History({
            user: user.id,
            book: book.id
        });
        book.status = "borrowed";
        await history.save();
        await book.save();
        await session.commitTransaction();
        session.endSession();
        return history;

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err instanceof ApiError ? err : new ApiError(500, 'Error borrowing book');
    }
};

const returnBook = async (userId, bookId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await Users.findById(userId);
        const book = await Books.findById(bookId);

        if (!user) throw new ApiError(404, 'Invalid user');
        if (!book) throw new ApiError(404, "Book does not exist");

        const history = await History.findOne({
            user: user.id,
            book: book.id
        });
        book.status = "available";
        history.returned = true;
        history.returnDate = Date.now();
        await history.save();
        await book.save();
        await session.commitTransaction();
        session.endSession();
        return history;

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err instanceof ApiError ? err : new ApiError(500, 'Error returning book');
    }
};

module.exports = {
    addBook,
    getAvailableBooks,
    updateBookStatus,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
};
