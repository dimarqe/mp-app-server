const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            "error": true,
            "message": "Unauthorized access",
            "data": null
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, payload)=>{
        if(err){
            return res.status(401).json({
                "error": true,
                "message": "Invalid access token",
                "data": null
            });
        }

        req.user = payload;
        next();
    });
}