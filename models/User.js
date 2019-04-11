var mongoose = require('mongoose');
var moment = require('moment');

var UserSchema = new mongoose.Schema({
    // first_name: {type: String, default: ''},
    // last_name: {type: String, default: ''},
    // username: {type: String, default: ''},
    email: {type: String, lowercase: true},
    password: {type: String, default: ''},
    profile: {
        name: {type: String, default: ''},
        picture: {type: String, default: ''}
    },
    address: {type: String, default: ''},
    timestamp: { type: String, default: () => moment().format('MMMM Do YYYY, h:mm:ss a')}
})

module.exports = mongoose.model('user', UserSchema)