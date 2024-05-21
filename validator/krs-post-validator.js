const { body } = require("express-validator");

const krsPostValidator = [
  [body("npm").notEmpty(), body("id_matakuliah").notEmpty()],
];
module.exports = krsPostValidator;
