// Import the Express.js library
const express = require('express');
const bp = require('body-parser');
// Create an Express application
const app = express();

const index = require('./routes/index');

// Define the hostname and port number
const hostname = '0.0.0.0';
const PORT = 8080;

app.use(bp.json());
app.use('', index);
// Start the Express server and listen on the specified hostname and port
app.listen(PORT, hostname, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the Express application to be used in other modules
module.exports = app;
