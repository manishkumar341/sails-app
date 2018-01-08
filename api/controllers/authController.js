module.exports = {
    // Sign up
    signUp : (req,res)=>{
        console.log('Hello World')
        var where = [{loginId:req.body.loginId},{email:req.body.email},{mobileNumber:req.body.email}];
        User.find(where)
        .then(user=>{
            if(!user)
            {
                User.create(req.body)
                .then(user=>{
                    user.token = jwtTokenService.issue({id: user.id});
                    console.log(user)
                    return res.ok(user);
                }).catch(error=>{
                    sails.log.error(error);
                });
            }
            else
            {
                if(user.loginId === req.body.loginId)
                {
                    return res.badRequest("User Already Exist");
                }
                else if(user.email === req.body.email)
                {
                    return res.badRequest("Email Already Exist");
                }
                else if(user.mobileNumber === req.body.mobileNumber)
                {
                    return res.badRequest("MobileNumber Already Exist");
                }
            }
        })
    },
    // SignIn
    signIn : (req,res)=>{
        User.find({loginId: req.body.loginId})
        .then(user=>{
            if(!user) return res.badRequest("User Not Found")
            User.compare(req.body.password, user, (error,match)=>{
                if(match)
                {
                    user.token = jwtTokenService.issue({id: user.id})
                    res.ok(user);
                } 
                else
                {
                    return res.badRequest("Invalid Password");
                }
            })
        }).catch(error=>{
            sails.log.error(error)
        });
    },
}