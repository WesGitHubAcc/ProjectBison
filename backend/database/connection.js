const sqlite3 = require('sqlite3').verbose()
const database = new sqlite3.Database('./database/blackbison.db')

database.serialize(() => {

    database.run(`CREATE TABLE if not exists user (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name TEXT NOT NULL,
        user_password TEXT NOT NULL,
        user_type TEXT NOT NULL
    )`);
    
    database.run(`CREATE TABLE if not exists client (
        client_cpf INTEGER PRIMARY KEY,
        client_name TEXT NOT NULL,
        client_email TEXT NOT NULL,
        client_phone INTEGER NOT NULL
    )`);
    
    database.run(`CREATE TABLE if not exists reserve(
        reserve_id INTEGER PRIMARY KEY AUTOINCREMENT,
        reserve_client_id INTEGER NOT NULL,
        reserve_number_peaples INTEGER NOT NULL,
        reserve_dates TEXT NOT NULL,
        FOREIGN KEY (reserve_client_id) REFERENCES client (client_cpf)
    )`)

    database.run(`CREATE TABLE if not exists category (
        category_id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_name TEXT NOT NULL
    )`)

    database.run(`CREATE TABLE if not exists item (
        item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_name TEXT NOT NULL,
        item_price REAL NOT NULL,
        item_category INTEGER NOT NULL,
        item_description TEXT NOT NULL,
        item_url_image TEXT NOT NULL,
        FOREIGN KEY (item_category) REFERENCES category (category_id)
    )`);

    database.run(`CREATE TABLE if not exists event (
        event_id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_url_image TEXT NOT NULL
    )`);
    
    database.close()

});

module.exports = new sqlite3.Database('./database/blackbison.db')