const mongoose = require("mongoose");

const jobsCandidatesShema = mongoose.Schema({
    id: {
        type: Number
    },
    jobId: {
        type: Number
    },
    candidateId: {
        type: Number
    },
    canditateDocumentId: {
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

module.exports = mongoose.model('JobsCandidatesShema', jobsCandidatesShema);