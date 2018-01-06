var jwt = require('jsonwebtoken');
var config = require('../../config/config');
module.exports = {
    issue : payload=>{
        return jwt.sign(payload,config.SECRETKEY,{expiresIn:60 * 60});
    },
    verify : (token,cb)=>{
        jwt.verify(token,config.SECRETKEY,{},cb)
    }
}