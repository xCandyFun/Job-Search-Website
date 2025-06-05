const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

const db_host = process.env.DB_HOST;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_database = process.env.DB_NAME;
const db_table_name = process.env.DB_TABLE_NAME;

console.log(`_____________${db_host}________`)

// Mysql connection
const db = mysql.createConnection({
    host: db_host,
    user: db_user,
    password: db_password,
    database: db_database
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// app.get('/', (req,res) => {
//     res.send('Hello from Express!')
// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/index.html'));
});

app.get('/api/data', (req, res) => {
    db.query(`SELECT * FROM ${db_table_name}`, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})