/**
 * ruta base: /api/search:param
 */
const { Router } = require("express");
const {
  search,
  searchCollection,
  searchImage,
} = require("../controllers/search.controller");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validations");
const { validateJWT } = require("../middlewares/tokenValidation");

const router = Router();

//SEARCH ALL
router.get("/:search", validateJWT, search);

//search by collection
router.get("/:table/:search", validateJWT, searchCollection);

module.exports = router;
