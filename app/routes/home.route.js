var mongoose = require('mongoose');
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'app/public/uploads')
    },
    filename: function (req, file, cb) {
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1);
        cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
})
var upload = multer({
    storage: storage
})

module.exports = function (app) {
    var UserCtrl = new app.controllers.UserCtrl(app, mongoose);
    app.get('/', upload.single('myimage'), function (req, res, next) {
        UserCtrl.render(req, res, next);
    });
}