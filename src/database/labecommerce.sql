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

INSERT INTO products VALUES
    ("v005", "RX 460", 300.00, "Placa de vídeo"),
    ("c003", "R5 5600G", 850.50, "Processador"),
    ("f007", "XPG Core React 650W", 499.90, "Fonte"),
    ("m010", "8GB DDR4 3200Mhz Asgard", 189.90, "Memória RAM"),
    ("v011", "RTX 4090", 9950.00, "Placa de vídeo");