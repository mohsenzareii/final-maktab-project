const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


//user schema 
const UserSchema = new Schema ({
    firstName : {
        type : String ,
        required : true ,
        trim : true ,
        maxlength : 30 ,
        minlength : 3
    },
    lastName : {
        type : String ,
        required : true ,
        trim : true ,
        maxlength : 30 ,
        minlength : 3
    },
    userName : {
        type : String ,
        required : true ,
        unique : true ,
        trim : true ,
        maxlength : 30 ,
        minlength : 3 ,
        lowercase : true
    },
    mobile : {
        type : String ,
        required : true ,
        trim : true ,
        unique : true
    },
    password : {
        type : String ,
        required : true ,
        maxlength : 30 ,
        minlength : 8
    },
    sex : {
        type : String ,
        required : true ,
        enum :['male' ,  'female']
    },
    role : {
        type : String ,
        enum : ['admin' , 'blogger']
    },
    createdAt : {
        type : Date ,
        required : true ,
        default : Date.now
    },
    avatar : {
        type : String
    }
});

module.exports = mongoose.model ('User' , UserSchema);