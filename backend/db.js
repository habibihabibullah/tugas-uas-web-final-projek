const mysql = require("mysql2");

const db = mysql.createPool({
    host: "gateway01.eu-central-1.prod.aws.tidbcloud.com",
    user: "2TcNVCHqNkHxEbp.root",
    password: "yEaQOq1g6up7CbOK",
    database: "kampus",
    port: 4000,
    ssl: {
        rejectUnauthorized: true
    }
});

module.exports = db;