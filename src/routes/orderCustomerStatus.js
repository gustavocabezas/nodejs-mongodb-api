const express = require("express");
const orderCustomerStatusShema = require("../models/orderCustomerStatus");

const router = express.Router();
 
router.post("/orderCustomerStatus", (req, res) => {
    const entity = orderCustomerStatusShema({
        ...req.body,
        dateCreated: Date.now()
    });
    entity
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.get("/orderCustomerStatus", (req, res) => {
    orderCustomerStatusShema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.get("/orderCustomerStatus/:id", (req, res) => {
    const { id } = req.params;

    orderCustomerStatusShema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.put("/orderCustomerStatus/:id", (req, res) => {
    const { id } = req.params;
    const updatedEntity = req.body;
    updatedEntity.dateUpdated = Date.now();

    orderCustomerStatusShema
        .updateOne({ _id: id }, { $set: updatedEntity })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
 
router.delete("/orderCustomerStatus/:id", (req, res) => {
    const { id } = req.params;

    orderCustomerStatusShema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;