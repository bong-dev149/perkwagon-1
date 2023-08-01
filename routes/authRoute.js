const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/registerUser');
const loginUser = require('../controllers/loginUser');
const verify = require('../emailService/verify');
const { check } = require('express-validator');
const e = require('express');

const registerValidationRules = [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const loginValidationRules = [
    check('email').isEmail().withMessage('Invalid email address'),
];
// Define routes
router.get('/', verify);
router.post('/register', registerValidationRules, registerUser);
router.post('/login', loginValidationRules, loginUser);



module.exports = router;
