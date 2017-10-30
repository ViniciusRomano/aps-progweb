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

var upload = multer({ storage: storage })
module.exports = function (app) {
    var ImageCtrl = new app.controllers.ImageCtrl(app, mongoose);

    app.get('/image', function (req, res, next) {
        ImageCtrl.render(req, res, next);
    });

    app.post('/image', upload.single('myimage'), function (req, res, next) {
        ImageCtrl.create(req, res, next);
    });

    app.get('/image/search', function (req, res, next) {
        ImageCtrl.search(req, res, next);
    });

}