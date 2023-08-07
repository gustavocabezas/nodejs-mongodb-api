const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.get("/security/authenticate", (req, res) => {
    console.log(req);
    res.json({ message: "Success Get" });
});

router.post("/security/authenticate", async (req, res) => { 
    const { primaryEmail, password } = req.body;

    try {

        const user = await User.findOne({ primaryEmail });
        if (!user) {
            return res.status(400).json({ message: "User not exist" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log(password);
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const authenticationResult = {
            id: user._id.toString(),
            token: token,
            primaryEmail: user.primaryEmail,
            profileId: user.profileId,
            statusId: user.statusId
        };

        return res.json(authenticationResult);

    } catch (error) {
        return res.json({ message: error.message });
    }
});

module.exports = router;