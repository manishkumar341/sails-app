var bcrypt = require('bcrypt');
module.exports = {
    attributes : {
        loginId : {
            type : 'string',
            required: true,
            unique : true
        },
        password : {
            type : 'string',
            required : true 
        },
        email : {
            type: 'string',
            required : true
        },
        mobileNumber : {
            type : 'string',
            required : true
        },
        toJSON: function () {
        var obj = this.toObject();
        delete obj.password;
        return obj;
        }
    },
    beforeCreate: (values,next)=>{
        bcrypt.genSalt(10,(error,salt)=>{
            if(error) return next(error);
            bcrypt.hash(values.password, salt, (error, hash)=>{
                if(error) return next(error);
                values.password = hash;
                next();
            });
        });
    },
    compare: (password,user,cb)=>{
        bcrypt.compare(password,user.password,(error,match)=>{
            if(error) return cb(error);
            if(match) return cb(null, true);
            cb(error);
        })
    }
}