const connection = require("../config/database");
const { validationResult } = require("express-validator");

class KrsController {
  static async index(req, res) {
    const connect = await connection();
    connect.query(
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

  static async show(req, res) {
    const connect = await connection();
    connect.query(
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
    const connect = await connection();
    connect.query("INSERT INTO tb_krs SET ?", formData, function (err, rows) {
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
    });
  }

  static async update(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }

      //id post
      let npm = req.params.npm;
      let id = req.params.id;

      //data post
      let formData = {
        id_matakuliah: req.body.id_matakuliah,
      };

      // update query
      const connect = await connection();
      connect.query(
        `UPDATE tb_krs SET ? WHERE npm = ${npm} && id=${id}`,
        formData,
        function (err, rows) {
          //if(err) throw err
          if (err) {
            return res.status(500).json({
              status: false,
              message: err.message,
              name: err.name,
            });
          } else {
            return res.status(200).json({
              status: true,
              message: "Update Data Successfully!",
            });
          }
        }
      );
    } catch (error) {
      return res.status(200).json({
        status: false,
        message: error.message,
        name: error.name,
      });
    }
  }

  static async delete(req, res) {
    let npm = req.params.npm;
    let id = req.params.id;

    const connect = await connection();
    connect.query(
      `DELETE FROM tb_krs WHERE npm = ${npm} && id=${id}`,
      function (err, rows) {
        //if(err) throw err
        if (err) {
          return res.status(500).json({
            status: false,
            message: err.message,
            name: err.name,
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "Delete Data Successfully!",
          });
        }
      }
    );
  }
}

module.exports = KrsController;
