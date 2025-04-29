CREATE DATABASE k8;

USE k8;

CREATE TABLE auth (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Insertar datos de usuario
INSERT INTO auth (username, password) VALUES ('admin', 'admin');

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Insertar datos de productos
INSERT INTO items (name, category, price) VALUES
('Laptop', 'Electronics', 999.99),
('Coffee Maker', 'Home Appliances', 49.99),
('Desk Chair', 'Furniture', 150.0),
('Smartphone', 'Electronics', 799.99),
('Headphones', 'Accessories', 199.99),
('Blender', 'Home Appliances', 89.99),
('Tablet', 'Electronics', 499.99),
('Office Desk', 'Furniture', 250.0),
('Wireless Mouse', 'Accessories', 29.99),
('Air Conditioner', 'Home Appliances', 349.99),
('Gaming Console', 'Electronics', 399.99),
('Bookshelf', 'Furniture', 120.0),
('Electric Kettle', 'Home Appliances', 39.99),
('Fitness Tracker', 'Accessories', 149.99),
('Camera', 'Electronics', 699.99),
('Toaster', 'Home Appliances', 29.99),
('Refrigerator', 'Home Appliances', 999.99),
('Microwave Oven', 'Home Appliances', 159.99),
('Standing Lamp', 'Furniture', 80.0),
('Electric Fan', 'Home Appliances', 49.99),
('Bluetooth Speaker', 'Accessories', 89.99),
('Smartwatch', 'Electronics', 299.99),
('Rice Cooker', 'Home Appliances', 59.99),
('Wall Clock', 'Furniture', 45.0),
('Printer', 'Electronics', 179.99),
('Television', 'Electronics', 899.99),
('Sofa', 'Furniture', 700.0),
('Keyboard', 'Accessories', 49.99),
('Air Fryer', 'Home Appliances', 129.99),
('Dishwasher', 'Home Appliances', 499.99),
('Drone', 'Electronics', 599.99),
('Smart Light Bulb', 'Accessories', 24.99),
('Bed Frame', 'Furniture', 400.0),
('Mattress', 'Furniture', 550.0),
('E-reader', 'Electronics', 129.99),
('Food Processor', 'Home Appliances', 99.99),
('Iron', 'Home Appliances', 39.99),
('Vacuum Cleaner', 'Home Appliances', 249.99),
('Electric Scooter', 'Electronics', 799.99),
('Monitor', 'Electronics', 299.99),
('Router', 'Electronics', 149.99),
('TV Stand', 'Furniture', 180.0),
('Curtains', 'Furniture', 70.0),
('Backpack', 'Accessories', 59.99),
('Power Bank', 'Accessories', 39.99),
('Electric Grill', 'Home Appliances', 89.99),
('Projector', 'Electronics', 399.99),
('Camera Tripod', 'Accessories', 79.99),
('Gaming Chair', 'Furniture', 300.0),
('Wireless Charger', 'Accessories', 29.99);
