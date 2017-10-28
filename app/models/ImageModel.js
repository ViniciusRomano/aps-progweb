
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: true
    },
    image_nickname: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    }
});


module.exports = function () {
    return mongoose.model('Image', ImageSchema);
}