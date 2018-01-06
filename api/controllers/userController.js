module.exports = {
    find : (req,res)=>{
        User.find()
        .then(user=>{
            res.ok(user);
        }).catch(error=>{
            sails.log.error(error);
        })
    }
}