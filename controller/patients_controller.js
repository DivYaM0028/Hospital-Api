const Patients = require("../models/patients");
const Doctor = require("../models/doctors");
const Report = require("../models/reports");

//----- register patent info
module.exports.register = async function (req, res) {
  console.log(req.body);

  try {
    let patient = await Patients.findOne({ phone: req.body.phone });

    if (!patient) {
      let patient = await Patients.create(req.body);
      return res.status(200).json({
        message: "Patient Registered Successfully",
        // Patient: patient,
        Patient_Details: {
          name: patient.name,
          phone: patient.phone,
        },
      });
    } else {
      return res.status(409).json({
        message: "Patient Already registered",
        Patient_ID: patient._id,
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Missing Name or PhoneNumber!!",
    });
  }
};

// Patient Report
module.exports.create_report = async function (req, res) {
  
  try {
    let patient = await Patients.findById(req.params.id);
    let doctor = await Doctor.findById(req.user.id);
    if (patient) {
      //Creating Report
      let report = await Report.create({
        status: req.body.status,
        doctor: doctor._id,
        patient: patient._id,
      });

      patient.report.push(report._id);
      patient.save();

      return res.status(200).json({
        message: " Report Created",
        Report: {
          Status: report.status,
          Doctor: doctor.username,
          Patient: patient.name,
        },
      });
    } else {
      return res.status(404).json({
        message: "Patient does't exist",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Missing Fields!!",
    });
  }
};

//---- display all report of patient
module.exports.all_reports = async function (req, res) {
  //console.log(req.params.id);

  try {
    let patient = await Patients.findById(req.params.id);

    if (patient) {
      let report = await Report.find({ patient: req.params.id })
        .sort("createdAt")
        .populate("doctor", "username -_id");

      return res.status(200).json({
        message: "Reports",
        All_Report: {
          patient: { name: patient.name, phone: patient.phone },
          report,
        },
      });
    } else {
      return res.status(500).json({
        message: "Patient ID incorrect",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};
