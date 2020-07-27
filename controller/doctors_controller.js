const Doctor = require("../models/doctors");
const jwt = require("jsonwebtoken");

// Doctor's Register 
module.exports.register = async function (req, res) {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(404).json({
        message: "Enter valid Username or Password",
      });
    } else {
      //Is Doctor already registered ?
      let doctor = await Doctor.findOne({ username: req.body.username });
      if (!doctor) {
        let doctor = await Doctor.create({
          username: req.body.username,
          password: req.body.password,
        });
        return res.status(200).json({
          message: "Doctor Registered Successfully!!",
        });
      }
      else {
        return res.status(200).json({
          message: "Doctor Already exist",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Doctor's Login
module.exports.login = async function (req, res) {
  try {
    let doctor = await Doctor.findOne({ username: req.body.username });

    if (!doctor || (req.body.password != doctor.password)) {
      return res.status(422).json({
        message: "Invalid Username or Password",
      });
    } else {
      return res.status(200).json({
        message:
          "Sign in successfully",
        Doctor: {
          token: jwt.sign(doctor.toJSON(), "hospital", {
            expiresIn: 100000000,
          }),
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
