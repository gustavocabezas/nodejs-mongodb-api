const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const sql = require('mssql');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const candidateDocumentsShema = require("../models/candidateDocuments");

router.post("/candidateDocuments", async (req, res) => {

    const entityData = req.body;
    entityData.dateCreated = Date.now();

    // MongoDB
    const entity = new candidateDocuments(entityData);
    try {
        await entity.save();
    } catch (err) {
        return res.status(500).send('Failed to save document in MongoDB: ' + err.message);
    }

    // sql
    /*     const request = new sql.Request();
    try {
        const query = `
            INSERT INTO CandidateDocuments (candidateId, presentationLetter, curriculum, dateCreated, createdBy)
            VALUES (@candidateId, @presentationLetter, @curriculum, @dateCreated, @createdBy)
        `;

        const bufferPresentationLetter = Buffer.from(entity.presentationLetter.toString('base64'), 'base64');
        const bufferCurriculum = Buffer.from(entity.curriculum.toString('base64'), 'base64');

        request.input('candidateId', sql.Int, entityData.candidateId)
            .input('presentationLetter', sql.VarBinary, bufferPresentationLetter)
            .input('curriculum', sql.VarBinary, bufferCurriculum)
            .input('dateCreated', sql.DateTime, entityData.dateCreated)
            .input('createdBy', sql.Int, entityData.createdBy);

        await request.query(query);
    } catch (err) {
        return res.status(500).send('Failed to save document in SQL: ' + err.message);
    } */

    res.json(entity);
});

router.get("/candidateDocuments", async (req, res) => {
    try {
        candidateDocumentsShema
            .find()
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    } catch (err) {
        return res.status(500).send('Error in GET candidateDocuments: ' + err.message);
    }
});

router.get("/candidateDocuments/:id", async (req, res) => {
    try {
        const { id } = req.params;
        candidateDocumentsShema
            .findById(id)
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    } catch (err) {
        return res.status(500).send('Error in GET candidateDocuments: ' + err.message);
    }
});


router.put("/candidateDocuments/:id", async (req, res) => { 
    const { id } = req.params;
    console.log(id);
    const updatedEntity = req.body;
    updatedEntity.dateUpdated = Date.now();
    await candidateDocumentsShema
        .updateOne({ _id: id }, { $set: updatedEntity })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


module.exports = router;