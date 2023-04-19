const { response } = require("express");
const { validationResult } = require("express-validator");

//validate fields errors
const validateFields = (req, res = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      ok: false,
      msg: "Bad information sent!",
      errors: errors.mapped(),
    });
  }
  next();
};

module.exports = {
  validateFields,
};
