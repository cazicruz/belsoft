const mongoose = require('mongoose');
const schema = mongoose.Schema;

const historySchema = new schema({
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    book:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Books',
        }
    ,
    returned:{
        type:Boolean,
        default:false
    },
    borrowDate:{
        type:Date,
        default:Date.now,
        required:true
    },
    returnDate:{
        type:Date,
    },
},{
    timestamps: true // Automatically add createdAt and updatedAt timestamps
})

const History= mongoose.model('History',historySchema );

module.exports=History;