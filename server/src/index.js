const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Create a connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the MySQL database');
    connection.release();
  }
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Health Services Directory!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Add the Categories API Endpoint
app.get('/api/categories', (req, res) => {
  const sql = 'SELECT * FROM categories';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Create an Endpoint to Add a New Service
app.post('/api/services', (req, res) => {
  const { title, description, category_id, contact_method } = req.body;
  const sql = 'INSERT INTO services (title, description, category_id, contact_method) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, description, category_id, contact_method], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Service added successfully', serviceId: result.insertId });
  });
});