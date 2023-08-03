const mongoose = require("mongoose");

const orderCustomerStatusShema = mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
        require: true
    },
    dateCreated: {
        type: Date,
        require: true
    },
    dateUpdated: {
        type: Date
    },
    createdBy: {
        type: Number,
        require: true
    },
    updatedBy: {
        type: Number
    },
});

module.exports = mongoose.model('OrderCustomerStatus', orderCustomerStatusShema);