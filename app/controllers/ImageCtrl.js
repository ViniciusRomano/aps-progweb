function ImageCtrl(app, mongoose) {
    // First save user
    // Get user id
    // Save login with crypto
    var imageModel = app.models.ImageModel;

    this.create = function (req, res, next) {
        let session = req.session;
        var data = req.body;
        var nickname = data.image_nickname;
        // Open mongo connection
        var connection = new app.databases.mongoConnection();
        console.log(req.file == null);
        if (req.file != null) {
            var image = new imageModel({
                username: session.username,
                image_nickname: data.image_nickname,
                filename: req.file.filename
            });
        } else {
            res.status(401).render('addimage/addimage', { error: 'Error: Image upload error!' });
        }
        // PROTEGER ROTA 
        if (nickname != '') {
            image.save(function (err) {
                if (err) {
                    //name error
                    res.status(401).render('addimage/addimage', { error: 'Error: DB error!' });

                } else {
                    res.status(201).redirect('/');
                }
            });
        } else {
            res.status(401).render('addimage/addimage', { error: 'Error: Name invalid!' });
        }

    };

    this.search = function (req, res, next) {
        var imageModel = app.models.ImageModel;
        var connection = new app.databases.mongoConnection();
        imageModel.find({ 'image_nickname': req.params.nickname })
            .then(
            function success(images) {
                console.log(images)
                res.render('home/index', { session: req.session, images: images });
            }, function error(err) {
                console.log(err);
                res.render('home/index', { session: req.session, images: images, err: error });
                connection.close();
            }
            )
            .catch(function (error) {
                console.log(error);
                res.render('home/index', { session: req.session, images: images, err: error });
                connection.close();
            });
    };

    this.render = function (req, res, next) {
        let session = req.session;
        if (session.status) {
            res.render('addimage/addimage', { error: null })
        } else {
            res.status(403).render('errors/403');
        }
    };

}

// Prototype wrapper
module.exports = function () {
    return ImageCtrl;
};