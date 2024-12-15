const bookService = require('../Services/booksService');
const Books = require('../Models/bookModel');

const addBook = async (req,res)=>{
    const {title, description,author,ISBN,publishedAt}= req.body;
    if (!title ||!description||!author||!ISBN ||!publishedAt) {
        return res.status(400).json({
            status:'error',
            msg:'title, description,author,ISBN,publishedAt are required to add a book'});
    }
    const bookObj={
        title,
        description,
        author,
        ISBN,
        publishedAt
    }
    const newBook = await bookService.addBook(bookObj)
    if ( newBook){
        return res.status(200).json({msg:'new book added to library',
                                    book:newBook});
                                    
    }
    return res.status(400).json({msg:'book already exists'})
}

const borrowBook = async (req, res)=>{
    const {bookId} = req.body;
    const userId = req.userId
    if(!bookId||!userId) return res.status(400).json({msg:'book id and user id are required'});
    const borrowHistory = await bookService.borrowBook(userId,bookId);
    return res.status(200).json({msg:'you just borrowed a book',
                                history:borrowHistory});
}

const returnBook = async (req, res)=>{
    const {bookId} = req.body;
    const userId = req.userId
    if(!bookId||!userId) return res.status(400).json({msg:'book id and user id are required'});
    const newHistory = await bookService.returnBook(userId,bookId);
    return res.status(200).json({msg:'book returned succefully',
                                history:newHistory})
}
const getAllBooks = async (req, res)=>{
    const books = await Books.find().exec();
    return res.status(200).json({msg:'all books retrieved',
                                books:books})
}
const getAllAvailableBooks = async (req, res)=>{
    const books = await bookService.getAvailableBooks();
    return res.status(200).json({msg:'all books retrieved',
                                books:books})
}

const updateBook = async (req,res)=>{
    const {title,description,status,author,ISBN,publishedAt}= req.body;
    const bookId = req.params;
    if (!bookId) return res.status(400).json({msg:'missing route parameter ID'});
    if (req.role !== 'admin'){
        return res.status(400).json({msg:'You cannot update this book'})
    }
    const book = await Books.findById({_id:bookId}).exec();
    const updateObj={
        title:title ? title:book.title,
        description:description? description:book.description,
        status:status?status:book.status,
        author:author?author:book.author,
        ISBN:ISBN?ISBN:book.ISBN,
        publishedAt:publishedAt?publishedAt:book.publishedAt
    }
    const updatedBook = await bookService.updateBook(updateObj);
    if (updatedBook){
        return res.status(200).json({msg:'book updated successfully',
                                    updatedBook})
    }
    return res.status(400).json({msg:'error updating book'})
}
const deleteBook = async (req,res)=>{
    const id = req.params;
    if(!id) return res.status(400).json({msg:'missing route parameter ID'});
    if (req.role !== 'admin'){
        return res.status(400).json({msg:'You cannot delete this book'})
    }
    const deletedBook = await bookService.deleteBook(id);
    if (deletedBook) return res.status(200).json({msg:'book deleted',
                                                    book:deletedBook})
    return res.status(400).json({msg:'error deleting book'})
}

const bookController ={
    addBook,
    borrowBook,
    returnBook,
    getAllBooks,
    getAllAvailableBooks,
    updateBook,
    deleteBook,
}
module.exports = bookController;