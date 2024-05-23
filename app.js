const express = require("express");
const router = require("./router/router");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
