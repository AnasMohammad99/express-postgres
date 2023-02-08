import jwt from "jsonwebtoken";

function authenticationMiddleware(req, res, next) {
    const authHeader = req.header('authorization')//Bearer token
    const token = authHeader && authHeader.split(" ")[1]
    if(token == null) return res.status(404).json({error:"no token"})
    jwt.verify(token, process.env.ACCESS_TOKEN, (error, user)=>{
        if(error) return res.status(404).json({error: error.message})
        req.user = user;
        next();
    })
}

export {
    authenticationMiddleware
}