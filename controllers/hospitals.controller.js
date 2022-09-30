const Hospital = require ('../models/hospital');


const getHospitals = async (req, res) => {
    const hospitals = await Hospital.find().populate('user', 'name email');

    res.json({
        ok: true,
        hospitals
    })
}

const createHospital = async (req, res) => {

    const hospital  = new Hospital(req.body);
    try {
        hospital.user = req.uid;
        const hospitalDB = await hospital.save();
    
        res.json({
            ok: true,
            msg: 'create hospital',
            hospitalDB,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Unexpected error... see logs'
        })
    }
    
}
const updateHospital = (req, res) => {
    res.json({
        ok: true,
        msg: 'update hospitals'
    })
}
const deleteHospital = (req, res) => {
    res.json({
        ok: true,
        msg: 'delete hospitals'
    })
}


module.exports = {
    getHospitals,
    createHospital,
    deleteHospital,
    updateHospital
}