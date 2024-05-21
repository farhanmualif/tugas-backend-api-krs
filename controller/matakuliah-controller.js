const connection = require("../config/database");
const { validationResult } = require("express-validator");

class MatakuliahController {
  static async index(req, res) {
    connection.query("SELECT * FROM tb_matakuliah", (err, rows) => {
      if (err) {
        console.error("Error executing query: ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ data: rows });
    });
  }
  static async show(req, res) {
    connection.query(
      `SELECT * FROM tb_matakuliah WHERE id=${req.params.id}`,
      (err, rows) => {
        if (err) {
          console.error("Error executing query: ", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json({ data: rows });
      }
    );
  }
  static async store(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    let formData = {
      kode: req.body.kode,
      nama: req.body.nama,
      sks: req.body.sks,
      semester: req.body.semester,
      ruang: req.body.ruang,
      jadwal: req.body.jadwal,
    };
    connection.query(
      "INSERT INTO tb_matakuliah SET ?",
      formData,
      function (err, rows) {
        //if(err) throw err
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: err,
          });
        } else {
          return res.status(201).json({
            status: true,
            message: "Insert Data Successfully",
            data: rows[0],
          });
        }
      }
    );
  }
}

module.exports = MatakuliahController;
