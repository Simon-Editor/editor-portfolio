// testDatabase.js

// Import the server module
const server = require('./server');  // Assuming 'server.js' is in the same folder

// Import SQLite3 to interact with the database
const sqlite3 = require('sqlite3').verbose();

// Create a database connection (adjust path to portfolio.db)
let db = new sqlite3.Database('./src/database/portfolio.db', (err) => {
  if (err) {
    console.error('Error opening the database:', err.message);
    return;
  }
  console.log('Connected to the database.');
});

// Test your server functionality (if needed)
server();  // Assuming server.js exports a function to test

// Example query to test the database connection
db.serialize(() => {
  db.all('SELECT * FROM portfolio', [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log('Data from portfolio table:', rows);
  });
});

// Close the database connection after the query
db.close((err) => {
  if (err) {
    console.error('Error closing the database:', err.message);
    return;
  }
  console.log('Database connection closed.');
});
