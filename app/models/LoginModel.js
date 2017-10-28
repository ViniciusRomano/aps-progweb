
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var LoginSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: false
    },
    userType: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

LoginSchema.pre('save', function(next) {
    var login = this;

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        login.salt = salt;

        // hash the password using our new salt
        bcrypt.hash(login.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            login.password = hash;
            next();
        });
    });
});

module.exports = function() {
    return mongoose.model('Login', LoginSchema);
}