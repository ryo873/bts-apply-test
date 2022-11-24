const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const myPlaintextPassword = "s0//P4$$w0rD";
// const someOtherPlaintextPassword = "not_bacon";

dotenv.config({ path: "./.env" });

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  table: "user",
  password: "",
  database: process.env.DATABASE,
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  console.log(req);
  res.sendFile(__dirname + "/index.html");
});

app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/register.html");
});

app.post("/login", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  const accessToken = jwt.sign(username);
});

app.post("/register", function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
  let hashedPassword = bcrypt.hash(password, saltRounds, function (err, hash) {
    return hash;
  });
  console.log(hashedPassword);
  var sql = "INSERT INTO user (email, password, username) VALUES (" + "'" + email + "'" + "," + "'" + hashedPassword + "'" + "," + "'" + username + "'" + ")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.send("ok register");
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});
