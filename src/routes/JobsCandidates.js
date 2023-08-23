const express = require("express");
const router = express.Router();
const jobsCandidatesShema = require("../models/JobsCandidates");
const mongoose = require('mongoose');
const multer = require('multer');
const sql = require('mssql');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/jobsCandidates", async (req, res) => {
    return res.json({ message: "Method not implemented" });
});

router.get("/jobsCandidates/:id", async (req, res) => {
    try {
        const { id } = req.params;

        candidateDocumentsShema
            .findById(id)
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    } catch (error) {
        return res.json({ message: error.message });
    }
});

router.post("/jobsCandidates", async (req, res) => {

    const entityData = {
        ...req.body,
        dateCreated: Date.now()
    };

    // MongoDB
    const entity = new jobsCandidatesShema(entityData);
    try {
        await entity.save();
    } catch (err) {
        return res.status(500).send('Failed to save document in MongoDB: ' + err.message);
    }

    // sql
    const request = new sql.Request();
    try {
        const query = `
            INSERT INTO JobsCandidates (JobId, CandidateId, CandidateDocumentId, dateCreated, createdBy)
            VALUES (@JobId, @CandidateId, @CandidateDocumentId, @dateCreated, @createdBy)
        `;
 
        request.input('JobId', sql.Int, entityData.jobId)
            .input('CandidateId', sql.Int, entityData.candidateId)
            .input('CandidateDocumentId', sql.NVarChar, entityData.candidateDocumentId)
            .input('dateCreated', sql.DateTime, new Date())
            .input('createdBy', sql.Int, entityData.createdBy);

        await request.query(query);
    } catch (err) {
        return res.status(500).send('Failed to save document in SQL: ' + err.message);
    }

    res.json(entity);
});


module.exports = router;