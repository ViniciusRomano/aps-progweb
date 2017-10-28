
var mongoose = require('mongoose');

module.exports = function(app) {

    var signupCtrl = new app.controllers.SignupCtrl(app, mongoose);

    app.get('/signup', function(req, res) {
        res.render('register/register');
    });

    app.post('/signup', function(req, res, next) {
        signupCtrl.register(req, res, next);
    });
}