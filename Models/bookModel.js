const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bookSchema = new schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type: String,
        enum:['available','borrowed'],
        default:'available',
        required:true
    },
    author:{
        type:String,
        required:true
    },
    ISBN:{
        type:String,
        required:true
    },
    publishedAt:{
        type:Date,
        required:true
    },
},{
    timestamps: true // Automatically add createdAt and updatedAt timestamps
})

// Add a unique index for title, author, and ISBN
bookSchema.index({ title: 1, author: 1, ISBN: 1 }, { unique: true });

const Books= mongoose.model('Books',bookSchema );

module.exports=Books;