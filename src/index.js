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
const jobsRoute = require("./routes/jobs"); 
const candidateDocumentsRoute = require("./routes/candidateDocuments");
const jobsCandidatesRoute = require("./routes/JobsCandidates");

const app = express();
if (process.env.NODE_ENV !== 'production') {
    app.use(express.json({ limit: '1gb' }));
}

app.get('/', (req, res) => {
    res.send("Welcome to my API");
})
app.use('/', securityRoutes);
app.use('/', userRoutes);
app.use('/', customerRoutes);
app.use('/', orderRoute);
app.use('/', orderProductRoute);
app.use('/', productRoute);
app.use('/', jobsRoute); 
app.use('/', candidateDocumentsRoute);
app.use('/', jobsCandidatesRoute);

var sqlConfig = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    server: process.env.MSSQL_SERVER,
    database: process.env.MSSQL_DATABASE,
    encrypt: true,
    trustServerCertificate: true
}; 

initializeDatabases();

async function initializeDatabases() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB Atlas");

        await sql.connect(sqlConfig);
        console.log("Connected to MSSQL");

    } catch (error) {
        console.error("Error connecting to a database:", error);
    }
}

if (process.env.NODE_ENV !== 'production') {
    const PORT = 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;