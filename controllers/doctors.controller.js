const Doctor = require ('../models/Doctor');


const getDoctors = async (req, res) => {

    const doctors = await Doctor.find()
        .populate('user', 'name email')
        .populate('hospital', 'name');

    res.json({
        ok: true,
        doctors
    })
}

const createDoctor = async  (req, res) => {
    const doctor  = new Doctor(req.body);
    try {
        doctor.user = req.uid;
        const doctorDB = await doctor.save();
    
        res.json({
            ok: true,
            msg: 'create Doctor',
            doctorDB,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Unexpected error... see logs'
        })
    }
}
const updateDoctor = (req, res) => {
    res.json({
        ok: true,
        msg: 'update Doctors'
    })
}
const deleteDoctor = (req, res) => {
    res.json({
        ok: true,
        msg: 'delete Doctors'
    })
}


module.exports = {
    getDoctors,
    createDoctor,
    deleteDoctor,
    updateDoctor
}