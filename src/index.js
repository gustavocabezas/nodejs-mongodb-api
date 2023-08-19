const express = require("express");
const mongoose = require("mongoose");
const sql = require('mssql');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const securityRoutes = require("./routes/security");
const userRoutes = require("./routes/user");
const customerRoutes = require("./routes/customer");
const orderRoute = require("./routes/order");
const orderProductRoute = require("./routes/orderProduct");
const productRoute = require("./routes/product");

const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to my API");
})
app.use('/', securityRoutes);
app.use('/', userRoutes);
app.use('/', customerRoutes);
app.use('/', orderRoute);
app.use('/', orderProductRoute);
app.use('/', productRoute);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));

sql.connect(process.env.MSSQL_CONNECTION_STRING)
    .then(() => console.log("Connected to MSSQL"))
    .catch(error => console.error("Error connecting to MSSQL:", error));

module.exports = app;