function UserCtrl(app, mongoose) {
    var model = app.models.LoginModel;
    this.render = function (req, res, next) {
        res.render('home/index', { session: req.session });
    }
}

// Prototype wrapper
module.exports = function () {
    return UserCtrl;
};