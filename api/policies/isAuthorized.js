module.exports = (req,res,next)=>{
    var token;    
    if (req.headers && req.headers.authorization)
    {
        token = req.headers.authorization;
        jwtTokenService.verify(token, (error,user)=>{
            if(error) return res.badRequest("Token Expired")
            User.find({id : user.id})
            .then(user=>{
                req.user = user;
                next();
            })
        })
    }
    else
    {
        res.badRequest("Token Missing");
    }
}