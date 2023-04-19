const fs = require('fs');

const User = require ('../models/user');
const Doctor = require ('../models/doctor');
const Hospital = require ('../models/hospital');


const updateImage = async (table, uid, newFileName) => {

    var elementDB;
    switch(table) {
        case 'users': 
            elementDB = await User.findById(uid);
        break;
        case 'doctors':
            elementDB = await Doctor.findById(uid);
        break;
        case 'hospitals':
            elementDB = await Hospital.findById(uid);
        break;
        default:
            return false;
    }

    if (!elementDB){
        return false;
    }

    const oldPath = `./uploads/${table}/${elementDB.image}`;

    //delete old Path
    if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
    }

    elementDB.image = newFileName;
    await elementDB.save();
    return true;
}

module.exports = {
    updateImage
}