var app = require('./config/express')();

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Running server at port ' + port);
});