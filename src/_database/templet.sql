/*
Purpose : Using sql file to systematically generete the Postgresql data base for my application 

@author : Sharif Islam


How to use : 

From the terminal run the following command : 

psql -U "user_name" -d "database_name" -f "sql_file_name"

replace the user_name, database_name and sql_file_name with the appropriate names  

*/


-- ===========================
-- USERS TABLE
-- ===========================

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- ===========================
-- INCOME TABLE
-- ===========================

DROP TABLE IF EXISTS income CASCADE;
CREATE TABLE income (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    budget DECIMAL(12,2),
    date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- ===========================
-- CATEGORY TABLE
-- ===========================

DROP TABLE IF EXISTS category CASCADE;
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- ===========================
-- SPENDING TABLE
-- ===========================

DROP TABLE IF EXISTS spending CASCADE;
CREATE TABLE spending (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    category_id INT REFERENCES category(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);
