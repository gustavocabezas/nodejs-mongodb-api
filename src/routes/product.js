const express = require("express");
const productShema = require("../models/product");

const router = express.Router();
 
router.post("/products", (req, res) => {
    const entity = productShema({
        ...req.body,
        dateCreated: Date.now()
    });
    entity
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.get("/products", (req, res) => {
    productShema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.get("/products/:id", (req, res) => {
    const { id } = req.params;

    productShema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.put("/products/:id", (req, res) => {
    const { id } = req.params;
    const updatedEntity = req.body;
    updatedEntity.dateUpdated = Date.now();

    productShema
        .updateOne({ _id: id }, { $set: updatedEntity })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.delete("/products/:id", (req, res) => {
    const { id } = req.params;

    productShema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;