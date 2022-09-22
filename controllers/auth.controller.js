const {response} = require('express');
const bcrypt = require('bcryptjs');

const User = require ('../models/user');
const { generateJWT } = require('../helpers/jwt.helper');


const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        //verify email
        const userDB = await User.findOne({email});
        //user mail is not registered
        if ( !userDB ){ 
            res.status(404).json({
                ok:false,
                msg: 'User not found.'
            });
        }

        //verify password
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            res.status(403).json({
                ok:false,
                msg: 'You are not allowed to login.'
            });
        }

        const token = await generateJWT(userDB.id);
        
        res.json({
            ok: true,
            token ,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Talk with the DBA'
        });
    }
}

module.exports = {
    login
}