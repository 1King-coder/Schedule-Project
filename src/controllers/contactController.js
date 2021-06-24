const Contact = require('../models/ContactModel');

exports.index = (request, response) => {
    response.render('contact', { contact: {} });
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
        request.session.save(() => response.redirect(`/contact/index/${contact.contact._id}`));
        return;

    } catch (e) {
        console.log(e);
        return response.render('404');
    };
};

exports.editIndex = async (request, response) => {
    if (!request.params.id) return response.render('404');
    try {
        const contact = await Contact.seachById(request.params.id);
        if (!contact) return response.render('404');

        response.render('contact', { contact });

    } catch (e) {
        console.log(e);
        response.render('404');
    }
};

exports.edit = async (request, response) => {
    try {
        if (!request.params.id) response.render('404');
        const contact = new Contact(request.body);
        await contact.edit(request.params.id);

        if (contact.errors.length > 0) {
            request.flash('errors', contact.errors);
            request.session.save(() => response.redirect(`/contact/index`));
            return;
        };

        request.flash('success', 'Contact successfully edited!');
        request.session.save(() => response.redirect(`/contact/index/${contact.contact._id}`));
        return;

    } catch (e) {
        console.log(e);
        return response.render('404');
    };
};

exports.deleteContact = async (request, response) => {
    try {
        if (!request.params.id) return response.render('404');

        const contact = await Contact.deleteContact(request.params.id);
        if (!contact) return response.render('404');

        request.flash('success', 'Contact successfully deleted.');
        request.session.save(() => response.redirect('/'));
        
    } catch (e) {
        console.log(e);
        response.render('404');
    };
};