const jwt = require('jsonwebtoken');
const JWT_SECRET="YoMan";

const fetchUser=(req,res,next)=>{
const token=req.header('authToken');
if(!token){
    return res.status(401).send({Error:"Unauthorised -validate token"})
}

try {
    const valid=jwt.verify(token,JWT_SECRET);
    req.user=valid.user;
    next() ;
} catch (error) {
    return res.status(401).send({Error:"Unauthorised -validate token"})
}
}




module.exports=fetchUser;