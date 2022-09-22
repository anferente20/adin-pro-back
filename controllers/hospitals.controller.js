
const getHospitals = (req, res) => {
    res.json({
        ok: true,
        msg: 'get hospitals'
    })
}

const createHospital = (req, res) => {
    res.json({
        ok: true,
        msg: 'create hospitals'
    })
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