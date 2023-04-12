-- Active: 1681162349516@@127.0.0.1@3306
CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

SELECT * FROM users;

INSERT INTO users VALUES
    ("001", "rodolfo@gmail.com", "rod2023"),
    ("002", "francisca@gmail.com", "fran2023"),
    ("003", "rafaela@gmail.com", "rafa2023");

CREATE TABLE
    products(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

SELECT * FROM products;

-- Create Product
INSERT INTO products VALUES
    ("v005", "RX 460", 300.00, "Placa de vídeo"),
    ("c003", "R5 5600G", 850.50, "Processador"),
    ("f007", "XPG Core React 650W", 499.90, "Fonte"),
    ("m010", "8GB DDR4 3200Mhz Asgard", 189.90, "Memória RAM"),
    ("v011", "RTX 4090", 9950.00, "Placa de vídeo");

-- Get All Users
SELECT * FROM users
ORDER BY email ASC;

-- Get All Products - versão 1.0
SELECT * FROM products
ORDER BY price ASC
LIMIT 20;

-- Get All Products - versão 2.0
SELECT * FROM products
WHERE price >= 100
AND price <=300
ORDER BY price ASC;

-- Search Product by name
SELECT * FROM products
WHERE name LIKE "RX 460"; 

-- Create User
INSERT INTO users VALUES
    ("004","francisco@gmail.com","ant2023");

-- Get Products by id
SELECT * FROM products 
WHERE name LIKE "v005";

-- Delete User By Id
DELETE from users
WHERE id LIKE "004";

-- Delete Product By Id
DELETE from products
WHERE id LIKE "v011";

-- Edit User By Id
UPDATE users SET password = "bananinha123" WHERE id="001";

-- Edit Product By Id
UPDATE products SET price = 895.90 WHERE id="c003";

