const connection = require("../config/database");
const { validationResult } = require("express-validator");

class MahasiswaController {
  static async index(req, res) {
    const connect = await connection();

    connect.query("SELECT * FROM tb_mahasiswa", (err, rows) => {
      if (err) {
        console.error("Error executing query: ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ data: rows });
    });
  }
  static async show(req, res) {
    const connect = await connection();
    connect.query(
      `SELECT * FROM tb_mahasiswa WHERE id=${req.params.id}`,
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
      nama: req.body.nama,
      npm: req.body.npm,
      tanggal_lahir: req.body.tanggal_lahir,
      tempat_lahir: req.body.tempat_lahir,
      agama: req.body.agama,
      email: req.body.email,
      alamat: req.body.alamat,
      prodi: req.body.prodi,
      jenis_kelamin: req.body.jenis_kelamin,
    };
    const connect = await connection();
    connect.query(
      "INSERT INTO tb_mahasiswa SET ?",
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

  static async update(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }

      //id post
      let id = req.params.id;

      //data post
      let formData = {
        nama: req.body.nama,
        npm: req.body.npm,
        tanggal_lahir: req.body.tanggal_lahir,
        tempat_lahir: req.body.tempat_lahir,
        agama: req.body.agama,
        email: req.body.email,
        alamat: req.body.alamat,
        prodi: req.body.prodi,
        jenis_kelamin: req.body.jenis_kelamin,
      };

      // update query
      const connect = await connection();
      connect.query(
        `UPDATE tb_mahasiswa SET ? WHERE id = ${id}`,
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
    try {
      let id = req.params.id;

      const connect = await connection();
      connect.query(
        `DELETE FROM tb_mahasiswa WHERE id = ${id}`,
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
    } catch (error) {
      return res.status(200).json({
        status: false,
        message: error.message,
        name: error.name,
      });
    }
  }
}

module.exports = MahasiswaController;
