const jwt = require("jsonwebtoken");




const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        //res.send("We need a token");
        res.status(401).json({msg:'Access denied, token missing'});
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({msg:'Access denied, token invalid'});
            } else {
                req.userId = decoded.UserInfo.id;
                next();
            }
        });
    }
}

module.exports = verifyJWT;