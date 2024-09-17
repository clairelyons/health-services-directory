const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();

const app = express();
app.use(cors()) // Enable CORS for all routes
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

// Fetch All Categories API Endpoint
app.get('/api/categories', (req, res) => {
  const sql = 'SELECT * FROM categories';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});


// Fetch Active Servicess Only
app.get('/api/services', (req, res) => {
  const query = `
    SELECT id, title, description, is_active, category_id, contact_method, county,
        (SELECT name FROM categories WHERE categories.id = services.category_id) AS category_name
    FROM services;
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching services:', error);
      return res.status(500).json({ error: 'Failed to fetch services' });
    }

      // Make sure is_active is correctly mapped to each service
      const mappedResults = results.map(service => ({
        ...service,
        is_active: service.is_active === 1  // Ensure 1 is converted to true, 0 to false
      }));

      res.status(200).json(mappedResults);
  });
});

// Mark service as inactive (soft delete)
app.put('/api/services/:id/inactive', (req, res) => {
  const { id } = req.params;

  // Set is_active to 0 to mark the service as inactive
  const query = 'UPDATE services SET is_active = 0 WHERE id = ?';

  db.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error marking service as inactive:', error);
      return res.status(500).json({ error: 'Failed to mark service as inactive' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json({ message: 'Service marked as inactive' });
  });
});

// Create 
app.post('/api/services', (req, res) => {
  const { title, description, category_id, contact_method, county } = req.body;

  // Default value for is_active
  const is_active = 1; // Assuming new services are active by default

  // Debugging: Log incoming data
  console.log('Creating new service with data:', { title, description, category_id, contact_method, county });
  
  // First, insert the new service
  const sql = 'INSERT INTO services (title, description, category_id, contact_method, is_active, county) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [title, description, category_id, contact_method, is_active, county], (err, result) => {  // Add is_active to the query values
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // After inserting, fetch the newly created service using result.insertId
    const newServiceId = result.insertId;
    const fetchQuery = `
      SELECT services.id, services.title, services.description, categories.name AS category_name
      FROM services
      LEFT JOIN categories ON services.category_id = categories.id
      WHERE services.id = ?
    `;

    // Now fetch the newly created service and return it to the frontend
    db.query(fetchQuery, [newServiceId], (fetchError, fetchResults) => {
      if (fetchError) {
        console.error('Error fetching new service:', fetchError);
        return res.status(500).json({ error: 'Failed to fetch new service' });
      }

      // Return the newly created service with the category name
      res.status(201).json(fetchResults[0]);  // Send the service back to the frontend
    });
  });
});


// // API Endpoint to Update a Service
app.put('/api/services/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, category_id} = req.body;

  // Set a default category_id if it's null or undefined
  const defaultCategoryId = category_id ? category_id : 1;  // Set default category_id here (1, for example)

  // Debugging: Log the incoming data
  console.log('Updating service with data:', { title, description, category_id: defaultCategoryId});

  // fix sql query
  const sql = 'UPDATE services SET title = ?, description = ?, category_id = ? WHERE id = ?';
  
  db.query(sql, [title, description, defaultCategoryId, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // After updating, fetch the updated service to return it
    const fetchUpdatedService = 'SELECT * FROM services WHERE id = ?';
    db.query(fetchUpdatedService, [id], (fetchErr, updatedResult) => {
      if (fetchErr) {
        console.error('Error fetching updated service:', fetchErr);
        return res.status(500).json({ error: fetchErr.message });
      }

      // Return the updated service to the frontend
      res.json(updatedResult[0]);
    });
  });
});


// Bookmarked Services New Endpoint!!! Rohit suggestion

