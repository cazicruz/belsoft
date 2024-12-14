const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: true,
    },
    DoB: {
        type: Date,
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{10,15}/.test(v); // Validates phone number length
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    country: {
        type: String
    },
    sex: {
        type: String,
        enum: ['Male', 'Female', 'Other'], // You could add a set of predefined options
    },
    password: {
        type: String,
        required: true,
        // select:false,  
    },
    email: {
        type: String,
        required: true,
        unique: true, // Make sure no two users share the same email
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v); // Validates email format
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    otp: {
        type: Number,
    },
    otp_date: {
        type: Date,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    suspended: {
        type: Boolean,
        default: false
    },
    refreshToken: String,
}, {
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
