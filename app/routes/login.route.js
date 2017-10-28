
var mongoose = require('mongoose');

module.exports = function(app) {

    var loginCtrl = new app.controllers.LoginCtrl(app, mongoose);

    app.get('/login', function(req, res) {
        res.render('login/login', {error: null});
    });

    app.post('/login', function(req, res, next) {
        loginCtrl.login(req, res, next);
    });

    app.get('/logout', function(req, res, next) {
        loginCtrl.logout(req, res, next);
    });
}