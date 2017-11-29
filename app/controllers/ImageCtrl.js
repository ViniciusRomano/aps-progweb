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
            console.log("aisjaos")
            res.status(403).json({
                error: 'You are not logged in'
            });
            res.end();
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
            res.status(401).json({
                error: 'Error: Image upload error!'
            });
            res.end();
        }
        // --------------------- //

        // Invalid image nickname 
        if (nickname != '') {
            image.save(function (err) {
                if (err) {
                    //name error
                    return res.status(401).json({
                        error: 'Error: DB error!'
                    });
                    res.end();

                } else {
                    res.status(201).json({
                        msg: "created!"
                    });
                    res.end();
                }
            });
        } else {
            return res.status(401).json({
                error: 'Error: Name invalid!'
            });
            res.end();
        }

    };

    this.searchRegex = function (req, res, next) {
        var imageModel = app.models.ImageModel;
        var connection = new app.databases.mongoConnection();
        var nickname = req.params.nickname;

        imageModel.find({
                'image_nickname': {
                    $regex: '^' + nickname
                }
            })
            .then(
                function success(images) {
                    res.status(200).json(images);
                },
                function error(err) {
                    res.status(400).json(err);
                    connection.close();
                }).catch(function (error) {
                res.status(400).json(error);
                connection.close();
            });
    };

    this.search = function (req, res, next) {
        var imageModel = app.models.ImageModel;
        var connection = new app.databases.mongoConnection();
        var nickname = req.params.nickname;

        imageModel.find({
                'image_nickname': nickname
            })
            .then(
                function success(images) {
                    res.status(200).json(images);
                },
                function error(err) {
                    res.status(400).json(err);
                    connection.close();
                }).catch(function (error) {
                res.status(400).json(error);
                connection.close();
            });
    };
    this.getAll = function (req, res, next) {

        var imageModel = app.models.ImageModel;
        var connection = new app.databases.mongoConnection();
        // Name empty
        /*         if (!nickname) {
                    res.render('home/index', { session: req.session, images: [], error: 'Invalid Search!' });
                }
         */
        // --------------------- //

        imageModel.find({})
            .then(
                function success(images) {
                    res.status(200).json(images);
                },
                function error(err) {
                    res.status(400).json({
                        "error": err
                    });
                    connection.close();
                }).catch(function (error) {
                res.status(400).json({
                    "error": error
                });
                connection.close();
            });
    };

    this.render = function (req, res, next) {
        let session = req.session;
        if (session.status) {
            res.render('addimage/addimage', {
                error: null
            })
        } else {
            res.status(403).render('errors/403');
        }
    };

}

// Prototype wrapper
module.exports = function () {
    return ImageCtrl;
};