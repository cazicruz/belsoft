const Users = require("../Models/userModel");
const mongoose = require('mongoose');


const findUserByEmail = async (email)=>{
    try {
        const user = await Users.findOne({email:email}).exec();
        return user;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getUserById = async (id)=>{
    try {
        const user = await Users.findById({_id:id}).exec();
        if(!user){
            return 1;
        }
        return user;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const updateUser = async (_id, updateObj)=>{
    try{
        const user = await Users.findByIdAndUpdate({_id}, updateObj, {new:true}).exec();
        return user;
    }catch(err){
        console.log(err);
        return null;
    }
}

const deleteUser = async (id)=>{
    try {
        const user = await Users.findByIdAndDelete(id).exec();
        return user;
    } catch (err) {
        console.log(err);
        return null;
    }
}



const userService = {
    findUserByEmail,
    getUserById,
    updateUser,
    deleteUser,
}
module.exports = userService
