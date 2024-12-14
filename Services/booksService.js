const Books = require('../Models/bookModel');
const History = require('../Models/historyModel')
const Users = require('../Models/userModel');
const mongoose = require('mongoose');


const addBook = async (bookObj) => {
    try {
        const oldBook = await Books.findOne({title:bookObj.title,
                                             ISBN:bookObj.ISBN,
                                             author:bookObj.author});
                                             
        if (oldBook) throw new Error("book already exist");
        
        const book = new Books(bookObj);
        await book.save();
        return book;
    } catch (error) {
        throw new Error(`Error adding book: ${error.message}`);
    }
};

const getAvailableBooks = async () => {
    try {
        return await Books.find({ status: 'available' }).exec();
    } catch (error) {
        throw new Error(`Error fetching available books: ${error.message}`);
    }
};

const updateBookStatus = async (_id, status) => {
    try {
        return await Books.findByIdAndUpdate(_id, { status }, { new: true }).exec();
    } catch (error) {
        throw new Error(`Error updating book status: ${error.message}`);
    }
};

const updateBook = async (_id, updateObj) => {
    try {
        return await Books.findByIdAndUpdate(_id, updateObj, { new: true }).exec();
    } catch (error) {
        throw new Error(`Error updating book: ${error.message}`);
    }
};

const deleteBook = async (id) => {
    try {
        return await Books.findByIdAndDelete(id).exec();
    } catch (error) {
        throw new Error(`Error deleting book: ${error.message}`);
    }
};

const borrowBook = async (userId, bookId)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const user = await Users.findById(userId)
        const book = await Books.findById(bookId)

        if (!user) throw new Error('invalid user');
        if (!book) throw new Error("book does not exist");

        const history = new History({user:user.id,
                                            book:book.id
                                        })
        book.status="borrowed";
        await history.save();
        await book.save();
        await session.commitTransaction();
        session.endSession();
        return history;
        
    }catch(err){
        await session.abortTransaction();
        session.endSession();
        throw new Error('error borrowing books')
    }

}
const returnBook = async (userId, bookId)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const user = await Users.findById(userId)
        const book = await Books.findById(bookId)

        if (!user) throw new Error('invalid user');
        if (!book) throw new Error("book does not exist");

        const history = await History.findOne({user:user.id,
                                                book:book.id})
        book.status="available";
        history.returned= true;
        history.returnDate= Date.now();
        await history.save();
        await book.save();
        await session.commitTransaction();
        session.endSession();
        return history;
        
    }catch(err){
        await session.abortTransaction();
        session.endSession();
        throw new Error('error borrowing books')
    }

}

module.exports = {
    addBook,
    getAvailableBooks,
    updateBookStatus,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
};
