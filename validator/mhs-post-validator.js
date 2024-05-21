const { body } = require("express-validator");

const mhsPostValidator = [
  [
    body("npm").notEmpty(),
    body("nama").notEmpty(),
    body("tanggal_lahir").notEmpty(),
    body("tempat_lahir").notEmpty(),
    body("agama").notEmpty(),
    body("email").notEmpty(),
    body("alamat").notEmpty(),
    body("prodi").notEmpty(),
    body("jenis_kelamin").notEmpty(),
  ],
];
module.exports = mhsPostValidator;
