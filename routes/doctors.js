const express = require('express');
const router = express.Router();
const doctors_controller = require('../controller/doctors_controller');


// doctors/register
router.post('/register', doctors_controller.register);

//doctors/login 
router.post('/login', doctors_controller.login);

module.exports = router;