/**
 * ruta base: /api/auth
 */
const { Router } = require("express");
const {
  login,
  googleAuth,
  renewToken,
} = require("../controllers/auth.controller");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/tokenValidation");

const router = Router();

router.post(
  "/",
  [
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").notEmpty(),
  ],
  login
);

router.get("/renew", validateJWT, renewToken);
router.post(
  "/google",
  [check("token", "The token is required").isEmail()],
  googleAuth
);

module.exports = router;
