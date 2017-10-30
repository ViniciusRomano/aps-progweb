
var bcrypt = require('bcrypt');

function LoginCtrl(app, mongoose) {

    var model = app.models.LoginModel;

    this.login = function (req, res, next) {
        var session = req.session;
        var login = req.body;
        var connection = new app.databases.mongoConnection();
        model.findOne({ username: login.username })
            .then(
            function success(person) {
                if (person !== null) {
                    bcrypt.compare(login.password, person.password, function (err, cmpRes) {
                        // Hash validated, so authentication matches
                        if (cmpRes) {
                            session.username = person.username;
                            session.userType = person.userType;
                            session.userId = person.userId;
                            session.status = true;
                            res.status(304).redirect('/');
                            res.end('done');
                            connection.close();
                        } else {
                            res.status(401).render('login/login', { error: 'Error: User and/or password invalid!' });
                            connection.close();
                        }
                    })
                } else {
                    throw Error('User and/or password invalid!');
                }
            }, function error(err) {
                res.status(401).render('login/login', { error: 'Error: User and/or password invalid!' });
                connection.close();
            }
            )
            .catch(function (error) {
                console.log(error);
                res.status(401).render('login/login', { error: error });
                connection.close();
            });
    };

    this.logout = function (req, res, next) {
        req.session.destroy(function (err) {
            if (err) {
                next(err);
            } else {
                res.status(301).redirect('/');
            }
        });
    }

}

// Prototype wrapper
module.exports = function () {
    return LoginCtrl;
};