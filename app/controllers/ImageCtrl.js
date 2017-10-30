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
        // Protect route
        if (!session.status) {
            res.status(403).render('errors/403');
        }
        // --------------------- //
        if (req.file != null) {
            var image = new imageModel({
                username: session.username,
                image_nickname: data.image_nickname,
                filename: req.file.filename
            });
        } else {
            // Upload error
            res.status(401).render('addimage/addimage', { error: 'Error: Image upload error!' });
        }
        // --------------------- //

        // Invalid image nickname 
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
        var nickname = req.query.image_nickname;
        // Name empty
        if (!nickname) {
            res.render('home/index', { session: req.session, images: [], error: 'Invalid Search!' });
        }

        // --------------------- //

        imageModel.find({ 'image_nickname': nickname })
            .then(
            function success(images) {
                if (!images[0]) {
                    // No image found
                    res.render('home/index', { session: req.session, images: images, error: 'No image found!' });
                } else {
                    res.render('home/index', { session: req.session, images: images, error: null });
                }
            }, function error(err) {
                res.render('home/index', { session: req.session, images: images, err: error });
                connection.close();
            }).catch(function (error) {
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