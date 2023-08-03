const mongoose = require("mongoose");

const orderShema = mongoose.Schema({
    id: {
        type: String
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

module.exports = mongoose.model('Order', orderShema);