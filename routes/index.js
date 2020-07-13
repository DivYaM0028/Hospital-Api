const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');


router.get('/', homeController.home);
router.use('/doctors', require('./doctors'));
router.use('/patients',require('./patients'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;