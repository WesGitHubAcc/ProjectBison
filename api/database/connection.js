const path = require('path')
const dir = path.resolve(__dirname, 'blackbison.db')
const sqlite3 = require('sqlite3-promisify')
const database = new sqlite3(dir)

    /*=============================USUARIOS======================================

    CREATE TABLE if not exists user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        password TEXT NOT NULL
    );
    
    CREATE TABLE if not exists reserve (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        CPF INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        lastName TEXT NOT NULL,
        phone INTEGER NOT NULL,
        amountPeoples INTEGER NOT NULL,
        date TEXT NOT NULL
    );

    CREATE TABLE if not exists category (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );

    CREATE TABLE if not exists item (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        itemCategory INTEGER NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        FOREIGN KEY (itemCategory) REFERENCES category (id)
    );

    CREATE TABLE if not exists event (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        image TEXT NOT NULL
    );
    
    database.close()

});
*/

module.exports = database 