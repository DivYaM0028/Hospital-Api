const mongoose = require("mongoose");

const reportsSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reports = mongoose.model("Reports", reportsSchema);

module.exports = Reports;
