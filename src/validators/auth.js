const { check, validationResult } = require('express-validator');

exports.validateRequestSignup = [
  check('firstName')
  .notEmpty()
  .withMessage('firstName is required'),
  check('lastName')
  .notEmpty()
  .withMessage('lastName is required'),
  check('email')
  .notEmpty()
  .withMessage('email is required'),
  check('role')
  .notEmpty()
  .withMessage('role is required'),
  check('password')
  .isLength({ min: 6 }).withMessage('must be at least 6 chars long')
  .matches(/\d/).withMessage('must contain a number')
]

exports.isRequestValidatedSignup = (req, res, next) => {
  const errors = validationResult(req);
  if(errors.array().length > 0){
    return res.status(400).json({error: errors.array()[0].msg})
  }
  next();
}


exports.validateRequestSignin = [
  check('email')
  .notEmpty().withMessage('email is required')
  .contains('@').withMessage('must be a correct email address (@ symbol is missing)')
  .contains('.').withMessage('must be a correct email address'),
]

exports.isRequestValidatedSignin = (req, res, next) => {
  const errors = validationResult(req);
  if(errors.array().length > 0){
    return res.status(400).json({error: errors.array()[0].msg})
  }
  next();
}