function UserCtrl(app, mongoose) {
    var model = app.models.LoginModel;
    this.render = function (req, res, next) {
        var imageModel = app.models.ImageModel;
        var connection = new app.databases.mongoConnection();
        imageModel.find({})
            .then(
            function success(images) {
                res.render('home/index', { session: req.session, images: images, error: null });
            }, function error(err) {
                res.render('home/index', { session: req.session, images: images, error: err });
                connection.close();
            }
            )
            .catch(function (error) {
                res.render('home/index', { session: req.session, images: images, error: error });
                connection.close();
            });
    }
}

// Prototype wrapper
module.exports = function () {
    return UserCtrl;
};