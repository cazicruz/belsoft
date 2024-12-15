const Users = require('../Models/userModel');

const roleCheck = async (req, res, next)=>{
    const id = req.userId;
    if(!id){
        res.status(400).json({msg:'unauthorized user'});
    }
    try{
        const user = await Users.findById(id);
        if(user){
            req.role = (user.role ==='admin') ?'admin' : 'user';
            console/log(req.role);
        }else{
            return res.status(400).json({msg:'unauthorized user'});
        }

        next();
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:'server error'});
    }
}

module.exports = roleCheck;