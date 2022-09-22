/**
 * ruta base: /api/hospitals
 */
 const { Router }  = require('express');
 const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals.controller');

 const { validateJWT } = require('../middlewares/tokenValidation');
 
 const router = Router();
 
 //get all hospitals
 router.get( '/', validateJWT );
 
 //create hospital
 router.post( 
     '/createHospital', 
     [
     ] ,
     createHospital 
 );
 
 //update Hospital
 router.put('/updateHospital/:id', 
     [
     ] ,
     updateHospital
 );
 
 //delete Hospital
 router.delete('/deleteHospital/:id', deleteHospital);
 
 
 module.exports = router;