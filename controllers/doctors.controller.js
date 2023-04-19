const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");

//get doctors
const getDoctors = async (req, res) => {
  const doctors = await Doctor.find()
    .populate("user", "name email")
    .populate("hospital", "name");

  res.json({
    ok: true,
    doctors,
  });
};

//create doctor
const createDoctor = async (req, res) => {
  const doctor = new Doctor(req.body);
  try {
    doctor.user = req.uid;
    const doctorDB = await doctor.save();

    res.json({
      ok: true,
      msg: "create Doctor",
      doctorDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error... see logs",
    });
  }
};

// update doctor
const updateDoctor = async (req, res) => {
  const uid = req.params.id;
  try {
    console.log(req.body);
    const doctorDB = await Doctor.findById(uid);
    if (!doctorDB) {
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
    if (await Hospital.findById(changes.hospital)) {
      return res.status(400).json({
        ok: false,
        msg: "Hospital registered does not exists.",
      });
    }

    const doctor = await Doctor.findByIdAndUpdate(uid, changes, {
      new: true,
    });

    res.json({
      ok: true,
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error... see logs",
    });
  }
};

//delete doctor
const deleteDoctor = async (req, res) => {
  const uid = req.params.id;
  try {
    const doctorDB = await Doctor.findById(uid);
    if (!doctorDB) {
      res.status(404).json({
        ok: false,
        msg: "Doctor not found",
      });
    }
    //delete user
    await Doctor.findByIdAndDelete(uid);

    console.log(uid);
    res.status(200).json({
      ok: true,
      msg: "Doctor deleted",
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
  getDoctors,
  createDoctor,
  deleteDoctor,
  updateDoctor,
};
