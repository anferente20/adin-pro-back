const User = require ('../models/user');
const Doctor = require ('../models/Doctor');
const Hospital = require ('../models/hospital');


const encrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt.helper');

//search all collections
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

//search especific collection
const searchCollection   =  async ( req, res ) => {

    const param = req.params.search || '';
    const table = req.params.table || '';
    const regex = new RegExp(param, 'i');

    results = [];

    switch(table) {
        case 'users': 
            results = await User.find({ name: regex });
        break;
        case 'doctors':
            results = await Doctor.find({ name: regex })
                .populate('user', 'name email')
                .populate('hospital', 'name');
        break;
        case 'hospitals':
            results = await Hospital.find({ name: regex })
                .populate('user', 'name email');
        break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'Plese show a collection among users, doctors and hospitals.'
            })
        break;
    }

    res.json({
        ok: true,
        search: param,
        results
    });
}


module.exports = {
    search,
    searchCollection
}