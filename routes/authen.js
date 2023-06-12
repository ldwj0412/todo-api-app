
const express = require('express');

const registerControllers= require('../controllers/authen');
const router = express.Router();



//for register ac
router.post('/register',registerControllers.register);
router.post('/login',registerControllers.Login);
//for login ac


module.exports = router;