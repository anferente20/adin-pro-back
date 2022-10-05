const Hospital = require("../models/hospital");

//get hospitals
const getHospitals = async (req, res) => {
  const hospitals = await Hospital.find().populate("user", "name email");

  res.json({
    ok: true,
    hospitals,
  });
};

//create hospital
const createHospital = async (req, res) => {
  const hospital = new Hospital(req.body);
  try {
    hospital.user = req.uid;
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      msg: "create hospital",
      hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error... see logs",
    });
  }
};

//update hospital
const updateHospital = async (req, res) => {
  const uid = req.params.id;
  try {
    console.log(req.body);
    const hodpitalDB = await Hospital.findById(uid);
    if (!hodpitalDB) {
      res.status(404).json({
        ok: false,
        msg: "Hospital not found",
      });
    }

    const changes = {
      ...req.body,
      user: uid,
    };

    //update
    if (await Hospital.findOne({ name: changes.name })) {
      return response.status(400).json({
        ok: false,
        msg: "Already exists an user with that name.",
      });
    }

    const hospital = await Hospital.findByIdAndUpdate(uid, changes, {
      new: true,
    });

    res.json({
      ok: true,
      hospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error... see logs",
    });
  }
};

//delete hospital
const deleteHospital = async (req, res) => {
  const uid = req.params.id;
  try {
    const hospitalDB = await Hospital.findById(uid);
    if (!hospitalDB) {
      res.status(404).json({
        ok: false,
        msg: "Hospital not found",
      });
    }
    //delete user
    await Hospital.findByIdAndDelete(uid);

    console.log(uid);
    res.status(200).json({
      ok: true,
      msg: "Hospital deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error... see logs",
    });
  }
};

module.exports = {
  getHospitals,
  createHospital,
  deleteHospital,
  updateHospital,
};
