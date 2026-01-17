//server.js
const express = require('express');
const app = express();
const { Pool } = require('pg');
const pool = new Pool({
    user: 'your_username',
    host: 'your_host',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});
