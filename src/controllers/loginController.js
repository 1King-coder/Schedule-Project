const Login = require('../models/LoginModel');


exports.index = (request, response) => {
    response.render('login')
};

exports.login = async (request, response) => {
    try {
        const login = new Login(request.body);
        await login.login();

        if (login.errors.length > 0) {
            request.flash('errors', login.errors);
            request.session.save(function()  {
                return response.redirect('/login/index');
            });
            return;
        };

        request.flash('success', 'You logged into the system.');
        request.session.user = login.user;
        request.session.save(function()  {
            return response.redirect('/login/index');
        });
        

    } catch (e) {
        console.log(e);
        return response.render('404');
    };
};

exports.register = async (request, response) => {
    try {
        const login = new Login(request.body);
        await login.register();

        if (login.errors.length > 0) {
            request.flash('errors', login.errors);
            request.session.save(function()  {
                return response.redirect('/login/index');
            });
            return;
        };

        request.flash('success', 'User successfully registered!');
        request.session.save(function()  {
            return response.redirect('/login/index');
        });
        

    } catch (e) {
        console.log(e);
        return response.render('404');
    };
};
