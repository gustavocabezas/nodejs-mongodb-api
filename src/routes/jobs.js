const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userShema = require("../models/user");
const sql = require('mssql');

router.get("/jobs", async (req, res) => {
    let request = new sql.Request();
    let result = await request.query('SELECT * FROM Jobs');
    return res.json(result.recordsets[0]);
});

router.get("/jobs/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let request = new sql.Request();
        request.input('Id', sql.Int, id);
        let result = await request.query('SELECT * FROM Jobs WHERE Id = @Id');

        if (!result.recordsets[0] || result.recordsets[0].length === 0) {
            return res.status(404).send({ message: "Job does not exist" });
        }
        return res.json(result.recordsets[0]);

    } catch (error) {
        return res.json({ message: error.message });
    }
});

module.exports = router;