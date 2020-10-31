const express = require('express');
const { signup, signin, requireSignin } = require('../controllers/auth')
const { validateRequest, isRequestValidated, isRequestValidatedSignup, validateRequestSignup, validateRequestSignin, isRequestValidatedSignin } = require('../validators/auth')

const router = express.Router();

router.post('/signin',validateRequestSignin, isRequestValidatedSignin, signin);

router.post('/signup', validateRequestSignup, isRequestValidatedSignup, signup);

module.exports = router;