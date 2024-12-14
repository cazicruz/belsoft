const Users = require('../Models/userModel');

const verifyUser = (req, res, next) => {
    const userId = req.userId;
    Users.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({msg:'Verification check Failed, User not found'});
            } else {
                if (user.isVerified) {
                    next();
                } else {
                    return res.status(403).json({msg:'Verification check Complete, User not verified'});
                }
            }
        })
        .catch(err => {
            return res.status(500).json({ msg: 'An error occurred during verification', error: err.message });
        });
}

module.exports = verifyUser;