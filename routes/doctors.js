const express = require('express');
const router = express.Router();
const doctors_controller = require('../controller/doctors_controller');


//---- routing to doctor registeration
router.post('/register', doctors_controller.register);

//---- routing to doctor login 
router.post('/login', doctors_controller.login);

module.exports = router;