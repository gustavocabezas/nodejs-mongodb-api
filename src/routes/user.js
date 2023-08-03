const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const userShema = require("../models/user");

router.post("/users", (req, res) => {
    const entity = userShema({
        ...req.body,
        dateCreated: Date.now()
    });

    bcrypt.hash(entity.password, 10)
        .then(hash => {
            entity.password = hash;
            console.log(entity);
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

    if (req.body.avatar != null) {
        updatedEntity.avatar = Buffer.from(req.body.image, 'base64');
    }

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