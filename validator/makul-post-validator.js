const { body } = require("express-validator");

const makulPostValidator = [
  [
    body("kode").notEmpty(),
    body("nama").notEmpty(),
    body("sks").notEmpty(),
    body("semester").notEmpty(),
    body("ruang").notEmpty(),
    body("jadwal").notEmpty(),
  ],
];
module.exports = makulPostValidator;
