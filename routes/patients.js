const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patients_controller');

router.get('/patient',patientsController.patient);
router.get('/register', patientsController.register);
router.get('/login', patientsController.login);


router.post('/create', patientsController.create);
router.post('/create-session', patientsController.createSession);


module.exports = router;