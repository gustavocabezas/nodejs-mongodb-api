const express = require("express");
const orderProductShema = require("../models/orderProduct");

const router = express.Router();
 
router.post("/orderProducts", (req, res) => {
    const entity = orderProductShema({
        ...req.body,
        dateCreated: Date.now()
    });
    entity
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.get("/orderProducts", (req, res) => {
    orderProductShema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.get("/orderProducts/:id", (req, res) => {
    const { id } = req.params;

    orderProductShema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.put("/orderProducts/:id", (req, res) => {
    const { id } = req.params;
    const updatedEntity = req.body;
    updatedEntity.dateUpdated = Date.now();

    orderProductShema
        .updateOne({ _id: id }, { $set: updatedEntity })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.delete("/orderProducts/:id", (req, res) => {
    const { id } = req.params;

    orderProductShema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;