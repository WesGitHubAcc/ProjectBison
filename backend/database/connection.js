const path = require('path')
const dir = path.resolve(__dirname, 'blackbison.db')
const sqlite3 = require('sqlite3-promisify')
const database = new sqlite3(dir)

    /*=============================USUARIOS======================================

    CREATE TABLE if not exists user (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name TEXT NOT NULL,
        user_password TEXT NOT NULL
    );
    
  CREATE TABLE if not exists reserve (
        reserve_cpf INTEGER PRIMARY KEY,
        reserve_name TEXT NOT NULL,
        reserve_last_name TEXT NOT NULL,
        reserve_phone INTEGER NOT NULL,
        reserve_number_peoples INTEGER NOT NULL,
        reserve_date TEXT NOT NULL
    );


  CREATE TABLE if not exists category (
        category_id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_name TEXT NOT NULL
    );

 CREATE TABLE if not exists item (
        item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_name TEXT NOT NULL,
        item_price REAL NOT NULL,
        item_category INTEGER NOT NULL,
        item_description TEXT NOT NULL,
        item_url_image TEXT NOT NULL,
        FOREIGN KEY (item_category) REFERENCES category (category_id)
    );

   CREATE TABLE if not exists event (
        event_id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_name TEXT NOT NULL,
        event_url_image TEXT NOT NULL
    );
    
    database.close()

});
*/
module.exports = database 