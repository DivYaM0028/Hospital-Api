const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const patients_controller = require('../controller/patients_controller'); 

//patients/register
router.post('/register', passport.authenticate('jwt', {session:false}), patients_controller.register);

//patients/:id/create_report
router.post('/:id/create_report', passport.authenticate('jwt', {session:false}), patients_controller.create_report);

//patients/:id/all_reports
router.get('/:id/all_reports', passport.authenticate('jwt', {session:false}), patients_controller.all_reports);

module.exports = router;