var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var session = require('express-session');

module.exports = function () {
    var app = express();
    var sess = {
        secret: 'y0ug0tt4f1ndth3secr3t',
        resave: false,
        saveUninitialized: true,
        cookie: {}
    };

    app.use(express.static('./app/public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    if (app.get('env') === 'production') {
        app.set('trust proxy', 1);
        sess.cookie.secure = true;
    }

    app.use(session(sess));

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    consign({ cwd: 'app' })
        .include('models')
        .then('databases')
        .then('controllers')
        .then('routes')
        .into(app);

    app.use(function (req, res, next) {
        res.status(404).render('errors/404');
    });

    app.use(function (error, req, res, next) {
        if (process.env.NODE_ENV == 'production') {
            if (error) {
                console.log(error);
                res.status(500).render('errors/500');
                return;
            }
        }
        console.log(error);
        next(error); n
    });

    return app;
}