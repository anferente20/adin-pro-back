require('dotenv').config();
const mongoose = require('mongoose');

//Function for db connection
const dbConnection = async () => {
    try{
        await mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_CLUSTER+'.ndjcc.mongodb.net/'+process.env.DB_NAME);
        console.log('DB Online');
    } catch ( error ) {
        console.log(error);
        throw new Error('Error al conectar a la base de datos.');
    }
}

//Export function
module.exports = {
    dbConnection
}