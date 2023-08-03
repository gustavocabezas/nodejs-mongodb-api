const mongoose = require("mongoose");

const customerShema = mongoose.Schema({
    id: {
        type: Number,
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

module.exports = mongoose.model('Customer', customerShema);