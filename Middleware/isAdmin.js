const Users = require('../Models/userModel');

const isAdmin = async (req, res, next)=>{
    const id = req.userId;
    if(!id){
        res.status(400).json({msg:'unauthorized user'});
    }
    try{
        const user = await Users.findById(id);
        if(!user.isAdmin){
            return res.status(404).json({msg:'admin permission required'})
        }
        next();
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:'server error'});
    }
}

module.exports = isAdmin;