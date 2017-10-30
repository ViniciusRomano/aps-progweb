
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: false
    },
    address: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    addressNumber: {
        type: Number,
        required: true
    }
});

module.exports = function () {
    return mongoose.model('User', UserSchema);
}