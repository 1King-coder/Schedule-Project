exports.index = (request, response) => {
    console.log(request.session.user)
    response.render('index');

};
