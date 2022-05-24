//Declare environment variables
require('dotenv').config();

//Import of dependencies
const express = require('express');
const { dbConnection } = require('./database/config');
var cors = require('cors');


//Create express sercer
const app = express();

// Configure CORS
app.use( cors() );

//connect to database
dbConnection();

//Create routes
app.get( '/', ( request, response ) => {
    response.json({
        ok: true,
        msg: 'Wenas'
    })
} );

app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo por port ' + process.env.PORT);
} );