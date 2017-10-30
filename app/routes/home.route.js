var mongoose = require('mongoose');

module.exports = function (app) {
    var UserCtrl = new app.controllers.UserCtrl(app, mongoose);
    app.get('/', function (req, res, next) {
        UserCtrl.render(req, res, next);
    });
}