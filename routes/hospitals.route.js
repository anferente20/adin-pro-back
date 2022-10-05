/**
 * ruta base: /api/hospitals
 */
const { Router } = require("express");
const { check } = require("express-validator");
const {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitals.controller");
const { validateJWT } = require("../middlewares/tokenValidation");
const { validateFields } = require("../middlewares/validations");

const router = Router();

//get all hospitals
router.get("/", getHospitals);

//create hospital
router.post(
  "/createHospital",
  [
    validateJWT,
    check("name", "name is required").not().isEmpty(),
    validateFields,
  ],
  createHospital
);

//update Hospital
router.put(
  "/updateHospital/:id",
  [
    validateJWT,
    check("name", "name is required").not().isEmpty(),
    validateFields,
  ],
  updateHospital
);

//delete Hospital
router.delete("/deleteHospital/:id", validateJWT, deleteHospital);

module.exports = router;
