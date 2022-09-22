
const getDoctors = (req, res) => {
    res.json({
        ok: true,
        msg: 'get Doctors'
    })
}

const createDoctor = (req, res) => {
    res.json({
        ok: true,
        msg: 'create Doctors'
    })
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