const mongoose = require("mongoose");

const loginShema = mongoose.Schema({
    primaryEmail: {
        type: String,
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('Login', loginShema);