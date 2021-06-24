const Contact = require('../models/ContactModel');

exports.index = (request, response) => {
    response.render('contact');
}

exports.register = async (request, response) => {
    try {
        const contact = new Contact(request.body);
        await contact.register();

        if (contact.errors.length > 0) {
            request.flash('errors', contact.errors);
            request.session.save(() => response.redirect('/contact/index'));
            return;
        };

        request.flash('success', 'Contact successfully registered!');
        request.session.save(() => response.redirect('/contact/index'));
        return;

    } catch (e) {
        console.log(e);
        return response.render('404');
    };
};