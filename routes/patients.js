const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patients_controller');

router.get('/patient',patientsController.patient);

module.exports = router;