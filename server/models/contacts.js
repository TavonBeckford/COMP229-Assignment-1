let mongoose = require("mongoose");
let contactsModel = mongoose.Schema({
    contactname: String,
    contactnumber: Number,
    email: String
},
    {
        collections:"contacts"
    });

module.exports = mongoose.model('contact', contactsModel);