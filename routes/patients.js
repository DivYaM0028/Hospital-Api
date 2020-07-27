const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const patients_controller = require('../controller/patients_controller'); 

//---- routing to patient registeration
router.post('/register', passport.authenticate('jwt', {session:false}), patients_controller.register);

//---- routing to creating patient report
router.post('/:id/create_report', passport.authenticate('jwt', {session:false}), patients_controller.create_report);

//--- routing to show all report of the patient
router.get('/:id/all_reports', passport.authenticate('jwt', {session:false}), patients_controller.all_reports);

module.exports = router;