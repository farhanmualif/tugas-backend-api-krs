const mysql = require("mysql2");
require("dotenv/config");

async function connection(params) {
  try {
    const conn = mysql.createConnection({
      host: "mysqldb",
      user: "root",
      database: "db_mahasiswa",
      password: "Moenzel1933*",
      multipleStatements: true,
    });

    console.log("Connected to database!");
    return conn;
  } catch (err) {
    console.error(
      `Error connecting to database: 
        code: ${err.code} \n 
        message: ${err.message} \n 
        sqlMessage: ${err.sqlMessage} \n 
        fatal: ${err.fatal} \n 
        fieldCount: ${err.fieldCount} \n 
        sql: ${err.sql} \n 
        stack: ${err.stack}`
    );
    console.log("Failed to connect to mysql on startup - retrying in 5 sec");
    setTimeout(connectWithRetry, 5000);
  }
}

module.exports = connection;
