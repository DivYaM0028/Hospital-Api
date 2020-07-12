const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctors_controller');

router.get('/doctor',doctorsController.doctor);
router.get('/register',doctorsController.register);
router.get('/login',doctorsController.login);

router.post('/create',doctorsController.create);
router.post('/create-session', doctorsController.createSession);
module.exports = router;