const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/registerUser');
const loginUser = require('../controllers/loginUser');
const emailVerification = require('../controllers/emailVerification');
const forgetPassword=require('../controllers/forgetPassword');
const refreshToken=require('../controllers/refreshToken');
const { check } = require('express-validator');
const resetPassword = require('../controllers/resetPassword');
const updatePassword = require('../controllers/updatePassword');
const resendEmail = require('../controllers/resendEmail');
const tokenVerify = require('../middleware/tokenVerify');

const registerValidationRules = [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const loginValidationRules = [
    check('email').isEmail().withMessage('Invalid email address'),
];
const updatePasswordRules = [
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];
// Define routes
router.get('/verifyEmail',tokenVerify, emailVerification);
router.post('/register',registerValidationRules,  registerUser);
router.post('/login', loginValidationRules, loginUser);
router.post('/refreshtoken',refreshToken);
router.post('/forgetPassword',loginValidationRules,forgetPassword);
router.get('/resetPassword',tokenVerify,resetPassword);
router.patch('/resetPassword', tokenVerify, updatePasswordRules, updatePassword );
router.post('/resendEmail',resendEmail);
module.exports = router;
