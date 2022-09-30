/**
 * ruta base: /api/search:param
 */
 const { Router }  = require('express');
 const { search } = require('../controllers/search.controller');
 const { check } = require('express-validator');
 const { validateFields } = require('../middlewares/validations');
 const { validateJWT } = require('../middlewares/tokenValidation');
 
 const router = Router();
 
 //get all users
 router.get( '/:search', validateJWT ,search );
 
 //create user
 
 
 module.exports = router;