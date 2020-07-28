const express = require("express");
const port = 8000;
const app = express();

const db = require("./config/mongoose");

const bodyParser = require("body-parser");
const config = require("config");
const morgan = require("morgan");

const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.use(passport.initialize());

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server:", err);
    return;
  }
  console.log("Server is up and runinng at port: ", port);
});

module.exports = app;
