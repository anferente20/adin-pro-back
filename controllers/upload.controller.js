const { v4: uuidv4 } = require('uuid');
const User = require ('../models/user');
const Doctor = require ('../models/Doctor');
const Hospital = require ('../models/hospital');


//uplad image to specific id of especific collection
const uploadImage   =  async ( req, res ) => {

    const uid = req.params.id || '';
    const table = req.params.table || '';
    console.log(table);
    const validTypes = ['user', 'hospitals', 'doctors'];
    if (!validTypes.includes(table)){
        return res.status(400).json({
            ok: false,
            msg: 'Plese show a collection among users, doctors and hospitals.'
        });
    }
    console.log(table);
    //get Image
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'Plese uplade an image.'
        });
    }

    //Process image
    const file = req.files.image;
    console.log(file);
    const fileName = file.name.split('.');
    const extension = fileName[fileName.length-1];

    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    if (!validExtensions.includes(extension)){
        return res.status(400).json({
            ok: false,
            msg: 'Extension not valid.'
        });
    }

    //generate image name
    const newName = `${uuidv4()}.${extension}`;

    //create path
    const path = `./uploads/${table}/${newName}`;

    //move image
    file.mv(path, (err) => {
        if (err) {
            return response.status(500).json({
                ok:false,
                msg: 'Unexpected error when move image... see logs'
            });
        }
        res.json({
            ok: true,
            msg: 'File uploaded',
            fileName: newName
        });
    });
}


module.exports = {
    uploadImage
}