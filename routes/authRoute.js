const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/registerUser');
const loginUser = require('../controllers/loginUser');
const emailVerification = require('../controllers/emailVerification');
const forgetPassword=require('../controllers/forgetPassword');
const refreshToken=require('../controllers/refreshToken');
const { check } = require('express-validator');
const updatePassword = require('../controllers/updatePassword');
const resendEmail = require('../controllers/resendEmail');
const tokenVerify = require('../middleware/tokenVerify');
const logoutUser = require('../controllers/logoutUser');
const logoutAll = require('../controllers/logoutAll');
const { verifyToken } = require('../reusable_module/tokenController');

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
router.post('/refreshtoken',tokenVerify,refreshToken);
router.post('/forgetPassword',loginValidationRules,forgetPassword);
router.patch('/resetPassword', tokenVerify, updatePasswordRules, updatePassword );
router.post('/resendEmail',resendEmail);
router.get('/logout',tokenVerify,logoutUser);
router.get('/logoutAll',tokenVerify,logoutAll);
module.exports = router;
