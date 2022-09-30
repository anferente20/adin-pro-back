const User = require ('../models/user');
const Doctor = require ('../models/Doctor');
const Hospital = require ('../models/hospital');


const encrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt.helper');

//get all users
const search  =  async ( req, res ) => {

    const param = req.params.search || '';
    const regex = new RegExp(param, 'i');

    const [users, hospitals, doctors] = await Promise.all([
        User.find({ name: regex }),
        Hospital.find({ name: regex }),
        Doctor.find({ name: regex })
    ]);


    res.json({
        ok: true,
        search: param,
        users,
        hospitals,
        doctors
    });
}

module.exports = {
    search
}