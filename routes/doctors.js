const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctors_controller');

router.get('/doctor',doctorsController.doctor);

module.exports = router;