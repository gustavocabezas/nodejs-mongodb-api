const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userShema = require("../models/user");
const sql = require('mssql');

router.post("/users/authenticate", async (req, res) => {
    console.log(req.body);
    const { primaryEmail, password } = req.body;

    try {
        let request = new sql.Request();
        request.input('PrimaryEmail', sql.VarChar, primaryEmail);
        let result = await request.query('SELECT * FROM users WHERE PrimaryEmail = @PrimaryEmail');
 
        if (result.recordset.length === 0) {
            return res.status(400).json({ message: "User not exist" });
        }

        const user = result.recordset[0];
        console.log(user);
        //const validPassword = await bcrypt.compare(password, user.password);
        const validPassword = password == user.Password;
        if (!validPassword) {
            console.log(password, user.Password);
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const authenticationResult = {
            id: user.Id.toString(),
            token: token,
            primaryEmail: user.PrimaryEmail,
            profileId: user.ProfileId,
            statusId: user.StatusId
        };

        console.log(authenticationResult);
        return res.json(authenticationResult);

    } catch (error) {
        return res.json({ message: error.message });
    }
});

router.post("/users", (req, res) => {
    const entity = userShema({
        ...req.body,
        dateCreated: Date.now()
    });

    bcrypt.hash(entity.password, 10)
        .then(hash => {
            entity.password = hash;
            return entity.save();
        })
        .then(data => res.json(data))
        .catch(error => res.json({ message: error }));

});

router.get("/users", (req, res) => {
    userShema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/users/:id", (req, res) => {
    const { id } = req.params;

    userShema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const updatedEntity = req.body;
    updatedEntity.dateUpdated = Date.now();
    userShema
        .updateOne({ _id: id }, { $set: updatedEntity })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.delete("/users/:id", (req, res) => {
    const { id } = req.params;

    userShema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;