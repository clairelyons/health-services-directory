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

// API Endpoint to Create a New Service
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

// API Endpoint to Retrieve All Services
app.get('/api/services', (req, res) => {
  const sql = 'SELECT services.*, categories.name AS category_name FROM services JOIN categories ON services.category_id = categories.id';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// API Endpoint to Update a Service
app.put('/api/services/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, category_id, contact_method } = req.body;
  const sql = 'UPDATE services SET title = ?, description = ?, category_id = ?, contact_method = ? WHERE id = ?';
  db.query(sql, [title, description, category_id, contact_method, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service updated successfully' });
  });
});

// API Endpoint to Delete a Service (by it's service id)
app.delete('/api/services/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM services WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  });
});