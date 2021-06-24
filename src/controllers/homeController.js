const Contact = require('../models/ContactModel');


exports.index = async (request, response) => {
    const contacts = await Contact.seachContacts();
    response.render('index', { contacts });
};
