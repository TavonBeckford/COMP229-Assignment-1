//require modules for the user model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
let user = mongoose.Schema
    (
        {
            username:
            {
                type: String,
                default: '',
                trim:true,
                required: 'username is required'
            },
            password:
            {
                type: String,
                default: '',
                trim:true,
                required: 'password is required'
            },
            email:
            {
                type: String,
                default: '',
                trim:true,
                required: 'email is required'
            },
        },
        {
            collection: "users"
        }
    
);
//configure options for user model
let options = ({missingPasswordError: 'wrong/missing password'});
user.plugin(passportLocalMongoose, options);
module.exports.User= mongoose.model('user', user);