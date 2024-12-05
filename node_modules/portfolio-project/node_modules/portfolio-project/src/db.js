const sqlite3 = require('sqlite3').verbose(); // Import the sqlite3 module

// Open the database (creates the file if it doesn't exist)
/* const db = new sqlite3.Database('./src/database/portfolio.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});
 */
const path = require('path');
const dbPath = path.join(__dirname, 'database', 'portfolio.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});


// You can now use `db` to interact with the database, for example:
db.serialize(() => {
    // Create a sample table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS portfolio (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
    )`);
});

// Export the `db` object so it can be used in other files (like your `api.js`)
module.exports = db;


/* node /c/Users/EDITOR/portfolio-project/src/server.js */