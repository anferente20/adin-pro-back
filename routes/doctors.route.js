/**
 * ruta base: /api/Doctors
 */
 const { Router }  = require('express');
const { check } = require('express-validator');
 const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctors.controller');

 const { validateJWT } = require('../middlewares/tokenValidation');
const { validateFields } = require('../middlewares/validations');
 
 const router = Router();
 
 //get all Doctors
 router.get( '/', getDoctors );
 
 //create Doctor
 router.post( 
     '/createDoctor', 
     [
        validateJWT,
        check('name', 'name is required').not().isEmpty(),
        validateFields
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