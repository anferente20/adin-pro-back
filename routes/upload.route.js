/**
 * ruta base: /api/uploads/
 */
 const { Router }  = require('express');
 const fileUpload = require('express-fileupload');
 const { uploadImage } = require('../controllers/upload.controller');
 const { check } = require('express-validator');
 const { validateFields } = require('../middlewares/validations');
 const { validateJWT } = require('../middlewares/tokenValidation');
 
 const router = Router();
 router.use(fileUpload()); 

 //upload image by collection
 router.put( '/:table/:id', validateJWT , uploadImage );

 
 module.exports = router;