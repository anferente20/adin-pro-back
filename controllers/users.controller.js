const User = require ('../models/user');
const encrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt.helper');

//get all users
const getUsers  =  async ( request, response ) => {

    const init = Number(request.query.init) || 0;
 
    const [users, total] = await Promise.all([
         User.find({}, 'name email role googleToken image')
            .skip(init)
            .limit(5),
        User.count()
    ])

    response.json({
        ok: true,
        total,
        users,
    });
}

//create user
const createUser =  async ( request, response ) => {
    const { email, password } = request.body;
    
    try {
        const emailExists = await User.findOne({email});
        if (emailExists) {
            response.status(400).json({
                ok:false,
                msg: 'User alredy exists!'
            })
        } 
        const user = new User(request.body);
        //ebcrypt password
        const salt = encrypt.genSaltSync();
        user.password = encrypt.hashSync( password, salt);
        

        await user.save();
    
        const token  = await generateJWT(user.id);
        response.json({
            ok: true,
            msg: 'create user',
            user,
            token
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok:false,
            msg: 'Unexpected error... see logs'
        })
    }
   
}

//update user
const updateUser = async ( request , response ) => {
    const  uid  = request.params.id;
    try {
        console.log(request.body);
        const userDB = await User.findById(uid);
        if (!userDB) {
            response.status(404).json({
                ok:false,
                msg: 'User not found'
            });
        }

        //update
        const { password, googleToken, email, ...fields} = request.body;
        if (userDB.email === email) {
            delete fields.email;
        } else {
            const userEmail = await User.findOne({email: email});
            if (userEmail){
                return response.status(400).json({
                    ok:false,
                    msg: 'Already exists an user with that email.'
                })
            }
        }
       
        fields.email = email;
        const user = await User.findByIdAndUpdate( uid, fields, {new: true} );

        response.json({
            ok: true,
            user: user
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok:false,
            msg: 'Unexpected error... see logs'
        });
    }
}

//delete user
const deleteUser = async(request, response ) => {
    const  uid  = request.params.id;
    try {

        const userDB = await User.findById(uid);
        if (!userDB) {
            response.status(404).json({
                ok:false,
                msg: 'User not found'
            });
        }
        //delete user
        await User.findByIdAndDelete(uid);

        console.log(uid);
        response.status(200).json({
            ok: true,
            "msg": "Usuario eliminado"
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok:false,
            msg: 'Unexpected error... see logs'
        });
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}