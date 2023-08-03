const express = require("express");
const orderShema = require("../models/order");

const router = express.Router();
 
router.post("/orders", (req, res) => {
    const entity = orderShema({
        ...req.body,
        dateCreated: Date.now()
    });
    entity
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.get("/orders", (req, res) => {
    orderShema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.get("/orders/:id", (req, res) => {
    const { id } = req.params;

    orderShema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.put("/orders/:id", (req, res) => {
    const { id } = req.params;
    const updatedEntity = req.body;
    updatedEntity.dateUpdated = Date.now();

    orderShema
        .updateOne({ _id: id }, { $set: updatedEntity })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.delete("/orders/:id", (req, res) => {
    const { id } = req.params;

    orderShema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;