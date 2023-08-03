const mongoose = require("mongoose");

const authenticationResultShema = mongoose.Schema({
    id: {
        type: Number
    },
    token: {
        type: String,
        require: true
    },
    primaryEmail: {
        type: String,
        require: true
    },
    profileId: {
        type: Number
    },
    statusId: {
        type: Number,
        require: true
    },
});

module.exports = mongoose.model('AuthenticationResult', authenticationResultShema);