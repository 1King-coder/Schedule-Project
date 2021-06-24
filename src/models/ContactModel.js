const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

// Table Schema
const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    createdOn: { type: Date, default: Date.now }
});

// Table model
const ContactModel = mongoose.model('contacts', ContactSchema);

function Contact(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;  
};

Contact.prototype.edit = async function(id) {
    if (typeof id !== 'string') return;
    this.validate();
    if (this.errors.length > 0) return;

    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
    
};



Contact.prototype.register = async function() {
    this.validate(); 
    
    if (this.errors.length > 0) return;
    
    this.contact = await ContactModel.create(this.body);
    
};

Contact.prototype.validate = function() {
    // Validation
    this.cleanUp();
    // E-mail must be valid
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid E-mail.');
    if (!this.body.name) this.errors.push('Name is required.');
    if (!this.body.email && !this.body.phone) this.errors.push('You need to send at least one contact.');
};

Contact.prototype.cleanUp = function() {
    for (const key in this.body) {
        if (key === 'phone') continue;
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        };
    };
    
    this.body = {
        name: this.body.name,
        lastname: this.body.lastname,
        email: this.body.email,
        phone: this.body.phone,
    };
};

Contact.seachById = async function(id) {
    if (typeof id !== 'string') return;
    const user = await ContactModel.findById(id);
    return user;
};

Contact.seachContacts = async function() {
    const contact = await ContactModel.find()
        .sort({ createdOn: 1 })
    return contact;
};

Contact.deleteContact = async function(id) {
    if (typeof id !== 'string') return;
    const contact = await ContactModel.findByIdAndDelete({ _id: id });
    return contact;
};

module.exports = Contact;
