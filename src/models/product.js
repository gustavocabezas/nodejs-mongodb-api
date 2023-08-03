const mongoose = require("mongoose");

const productShema = mongoose.Schema({
    id: {
        type: Number,
    },
    name:{

    },
    description:{
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

module.exports = mongoose.model('Product', productShema);