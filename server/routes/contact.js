let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

//connect to our contact model
let Contact = require('../models/contacts');
//GET route for the contact page
router.get('/', (req, res, next) => {
    Contact.find((err, contactList) => {
        if(err){

        return console.error(err);
        }
    
        else{
            //console.log(ContactList);
            res.render('contact/list', {title:'Business Contacts', ContactList:contactList})
        }
    });

});

let contactController = require('../controllers/contact');
//Ensure Authentication
function requireAuth(req, res, next)
{
    // Check if the user is already logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

//GET ROUTE for the contact list page - READ OPERATION
router.get('/',contactController.displayContactList );

/*GET Route for displaying the Add Page - CREATE Operation*/
router.get('/add', requireAuth,contactController.displayAddPage);

/*POST Route for processing the Add Page - CREATE Operation*/

router.post('/add', requireAuth,contactController.processAddPage);

/* GET Route for displaying the Edit Page - UPDATE operation*/
router.get('/edit/:id',requireAuth,contactController.displayEditPage);

/* POST Route for processing the Edit Page - UPDATE operation*/
router.post('/edit/:id', requireAuth,contactController.processEditPage);

/* GET to [perform Deletion - DELETE Operation*/
router.get('/delete/:id',requireAuth,contactController.performDelete);

module.exports = router;