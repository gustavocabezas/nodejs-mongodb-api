const express = require("express");
const customerShema = require("../models/customer");

const router = express.Router();
 
router.post("/customers", (req, res) => {
    const entity = customerShema({
        ...req.body,
        dateCreated: Date.now()
    });
    entity
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.get("/customers", (req, res) => {
    customerShema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.get("/customers/:id", (req, res) => {
    const { id } = req.params;

    customerShema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.put("/customers/:id", (req, res) => {
    const { id } = req.params;
    const updatedEntity = req.body;
    updatedEntity.dateUpdated = Date.now();

    customerShema
        .updateOne({ _id: id }, { $set: updatedEntity })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.delete("/customers/:id", (req, res) => {
    const { id } = req.params;

    customerShema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;