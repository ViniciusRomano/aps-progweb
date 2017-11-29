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
    var ImageCtrl = new app.controllers.ImageCtrl(app, mongoose);


    app.get('/create/image', function (req, res, next) {
        ImageCtrl.render(req, res, next);
    });

    // -- routes to search all images -- 

    app.get('/images', function (req, res, next) {
        ImageCtrl.getAll(req, res, next);
    });

    app.get('/images/:nickname', function (req, res, next) {
        ImageCtrl.search(req, res, next);
    });
    app.get('/images/regex/:nickname', function (req, res, next) {
        ImageCtrl.searchRegex(req, res, next);
    });

    // -----------------------------

    // -- routes to create images -- 

    // render html page
    app.get('/create/image', function (req, res, next) {
        ImageCtrl.render(req, res, next);
    });
    // create image
    app.post('/create/image', upload.single('myimage'), function (req, res, next) {
        ImageCtrl.create(req, res, next);
    });

    // -----------------------------

    // -- route to search images in db --
    app.get('/image/search', function (req, res, next) {
        ImageCtrl.search(req, res, next);
    });

    // -----------------------------

    //test route
    app.post('/teste', function (req, res, next) {
        ImageCtrl.post(req, res, next);
    });

}