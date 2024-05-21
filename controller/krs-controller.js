const connection = require("../config/database");
const { validationResult } = require("express-validator");

class KrsController {
  static async index(req, res) {
    connection.query("SELECT * FROM tb_krs", (err, rows) => {
      if (err) {
        console.error("Error executing query: ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ data: rows });
    });
  }
  static async show(req, res) {
    connection.query(
      `SELECT * FROM tb_krs WHERE id=${req.params.id}`,
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
      npm: req.body.npm,
      id_matakuliah: req.body.id_matakuliah,
    };
    connection.query(
      "INSERT INTO tb_krs SET ?",
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
  static async allKrsMhs(req, res) {
    connection.query(
      `SELECT tb_mahasiswa.npm,tb_mahasiswa.nama as nama_mahasiswa,tb_matakuliah.kode as kode_makul,tb_matakuliah.nama as nama_matakuliah,tb_matakuliah.sks,tb_matakuliah.semester,tb_matakuliah.ruang,tb_matakuliah.jadwal FROM tb_krs JOIN tb_mahasiswa ON tb_krs.npm=tb_mahasiswa.npm JOIN tb_matakuliah ON tb_krs.id_matakuliah=tb_matakuliah.id`,
      (err, rows) => {
        if (err) {
          console.error("Error executing query: ", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json({ data: rows });
      }
    );
  }
  static async krsMhs(req, res) {
    console.log(req.params.npm);
    connection.query(
      `SELECT tb_mahasiswa.npm,tb_mahasiswa.nama as nama_mahasiswa,tb_matakuliah.kode as kode_makul,tb_matakuliah.nama as nama_matakuliah,tb_matakuliah.sks,tb_matakuliah.semester,tb_matakuliah.ruang,tb_matakuliah.jadwal FROM tb_krs JOIN tb_mahasiswa ON tb_krs.npm=tb_mahasiswa.npm JOIN tb_matakuliah ON tb_krs.id_matakuliah=tb_matakuliah.id WHERE tb_krs.npm=${req.params.npm}`,
      (err, rows) => {
        if (err) {
          console.error("Error executing query: ", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json({ data: rows });
      }
    );
  }
}

module.exports = KrsController;
