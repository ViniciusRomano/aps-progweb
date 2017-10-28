function UserCtrl(app, mongoose) {
    var model = app.models.LoginModel;
    this.render = function (req, res, next) {
        var imageModel = app.models.ImageModel;
        var connection = new app.databases.mongoConnection();
        imageModel.find({})
            .then(
            function success(images) {
                console.log('entrei')
                res.render('home/index', { session: req.session, images: images });
            }, function error(err) {
                console.log(err);
                res.render('home/index', { session: req.session, images: images });
                connection.close();
            }
            )
            .catch(function (error) {
                console.log(error);
                res.render('home/index', { session: req.session, images: images });
                connection.close();
            });
    }
}

// Prototype wrapper
module.exports = function () {
    return UserCtrl;
};