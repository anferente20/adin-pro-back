/**
 * ruta base: /api/Doctors
 */
 const { Router }  = require('express');
 const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctors.controller');

 const { validateJWT } = require('../middlewares/tokenValidation');
 
 const router = Router();
 
 //get all Doctors
 router.get( '/', getDoctors );
 
 //create Doctor
 router.post( 
     '/createDoctor', 
     [
     ] ,
     createDoctor 
 );
 
 //update Doctor
 router.put('/updateDoctor/:id', 
     [
     ] ,
     updateDoctor
 );
 
 //delete Doctor
 router.delete('/deleteDoctor/:id', deleteDoctor);
 
 
 module.exports = router;