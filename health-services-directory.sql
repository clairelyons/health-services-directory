CREATE DATABASE health_services_directory;

USE health_services_directory;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT,
    contact_method VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE bookmarks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    service_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);

-- Insert users
INSERT INTO users (email, password) VALUES 
('user1@example.com', 'password123'),
('user2@example.com', 'password123'),
('user3@example.com', 'password123');

-- Insert categories
INSERT INTO categories (name) VALUES 
('General Health'),
('Mental Health'),
('Dental Care'),
('Vision Care');

-- Insert services
INSERT INTO services (title, description, category_id, contact_method) VALUES 
('City Health Clinic', 'A clinic offering general health services.', 1, 'Phone'),
('Mental Wellness Center', 'Support and counseling services for mental health.', 2, 'Email'),
('Bright Smile Dental', 'Comprehensive dental care services.', 3, 'Message'),
('Clear Vision Optometry', 'Vision care and eye exams.', 4, 'Phone'),
('Family Health Center', 'Family-oriented health services.', 1, 'Phone'),
('Mental Health Hotline', '24/7 mental health support hotline.', 2, 'Phone');

-- Insert bookmarks
INSERT INTO bookmarks (user_id, service_id) VALUES 
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5);


SELECT * FROM users;
SELECT * FROM categories;
SELECT * FROM services;
SELECT * FROM bookmarks;

ALTER TABLE services ADD COLUMN is_active TINYINT(1) DEFAULT 1;

SELECT id, title, description, is_active, category_id,
       (SELECT name FROM categories WHERE categories.id = services.category_id) AS category_name
FROM services;

DESCRIBE services;

UPDATE services SET is_active = 0 WHERE id = 1;  -- Mark the service with id 1 as inactive

ALTER TABLE services DROP COLUMN active;

SELECT * FROM services WHERE id >= 7;
DELETE FROM services WHERE id >= 7;

UPDATE services
SET is_active = 1
WHERE id >= 1;
 