//Declare environment variables
require('dotenv').config();

//Import of dependencies
const express = require('express');
const { dbConnection } = require('./database/config');
var cors = require('cors');

//Create express server
const app = express();

//read body
app.use( express.json() );




// Configure CORS
app.use( cors() );

//connect to database
dbConnection();

//Create routes
app.use('/api/users', require('./routes/users.route'));
app.use('/api/hospitals', require('./routes/hospitals.route'));
app.use('/api/doctors', require('./routes/doctors.route'));
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/search', require('./routes/search.route'));
app.use('/api/upload', require('./routes/upload.route'));



app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo por port ' + process.env.PORT);
} );