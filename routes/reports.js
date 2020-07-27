const express = require('express');
const router = express.Router();
const passport = require('passport');

const reports_controller = require('../controller/reports_controller');

//---- routing to display all report
router.get('/:status',passport.authenticate('jwt', {session:false}) ,reports_controller.all_report);

module.exports = router;