const Patients = require("../models/patients");
const Doctor = require("../models/doctors");
const Report = require("../models/reports");

// Display all reports
module.exports.all_report = async function (req, res) {
  if (!req.params) {
    return res.status(404).json({
      message: "missing params",
    });
  }

  try {
    let report = await Report.find({ status: req.params.status })
      .sort("createdAt")
      .populate("doctor", "username -_id")
      .populate("patient", "name phone -_id");
    
    if (report) {
      return res.status(200).json({
        data: { report },
        message: "All Reports",
      });
    } else {
      return res.status(404).json({
        message: "No Report Found!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
