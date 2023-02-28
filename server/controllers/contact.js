let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//create a reference to the db Schema which is the model
let Contact = require('../models/contacts');
//display contactList
module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if (err) {
        
            return console.error(err);
        }
        
        else
        {
            //console.log(ContactList);
            res.render('contact/list',{title:'Business Contacts', ContactList:contactList})
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('contact/add',{title:'Add Contact'})
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = Contact({
        "contactname": req.body.contactname,
        "contactnumber": req.body.contactnumber,
        "email": req.body.email
    });
    Contact.create(newContact, (err, Contact) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contactList');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Contact.findById(id, (err, contactToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('contact/edit', { title: 'Edit Contact', contact: contactToEdit });
        }
    });

}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id
    let updatedContact = Contact({
        "_id": id,
        "contactname": req.body.contactname,
        "contactnumber": req.body.contactnumber,
        "email": req.body.email
    });
    Contact.updateOne({ _id: id }, updatedContact, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contactList');
        }
    });

}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    Contact.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contactList');
        }
    });
}