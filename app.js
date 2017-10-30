var app = require('./config/express')();

var port = process.env.PORT || 3000;

app.listen(3000, function () {
    console.log('Running server at port ' + port);
});