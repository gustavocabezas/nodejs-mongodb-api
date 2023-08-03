const mongoose = require("mongoose");

const userRegistrationShema = mongoose.Schema({
    id: {
        type: String
    },
    userId: {
        type: Number,
    },
    code: {
        type: String,
    },
    Validated: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date
    },
    dateUpdated: {
        type: Date
    },
    createdBy: {
        type: Number
    },
    updatedBy: {
        type: Number
    },
});

module.exports = mongoose.model('UserResgistration', userRegistrationShema);