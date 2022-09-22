/**
 * ruta base: /api/users
 */
const { Router }  = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validations');
const { validateJWT } = require('../middlewares/tokenValidation');

const router = Router();

//get all users
router.get( '/', validateJWT ,getUsers );

//create user
router.post( 
    '/createUser', 
    [
        check('name', 'name is required').not().isEmpty(),
        check('password', 'password is required').not().isEmpty(),
        check('email', 'email is required').not().isEmpty(),
        check('email', 'bad email registered').isEmail(),
        validateFields
    ] ,
    createUser 
);

//update user
router.put('/updateUser/:id', 
    [
        validateJWT,
        check('name', 'name is required').not().isEmpty(),
        check('password', 'password is required').not().isEmpty(),
        check('email', 'email is required').not().isEmpty(),
        check('role', 'bad email registered').not().isEmpty(),
        validateFields
    ] ,
    updateUser
);

//delete user
router.delete('/deleteUser/:id',validateJWT, deleteUser);


module.exports = router;