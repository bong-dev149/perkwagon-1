const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const registerUser = require('../controllers/registerUser');
const loginUser = require('../controllers/loginUser');
const verify = require('../emailService/verify');
const { check } = require('express-validator');
const e = require('express');
=======
const authController = require('../controllers/authController');
const { check } = require('express-validator');
>>>>>>> 7adc3255ec39f2b1b75185b66e800ac296053196

const registerValidationRules = [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const loginValidationRules = [
    check('email').isEmail().withMessage('Invalid email address'),
];
// Define routes
<<<<<<< HEAD
router.get('/', verify);
router.post('/register', registerValidationRules, registerUser);
router.post('/login', loginValidationRules, loginUser);


=======
router.put('/', registerValidationRules, authController.registerUser);
router.post('/', loginValidationRules, authController.loginUser);
>>>>>>> 7adc3255ec39f2b1b75185b66e800ac296053196

module.exports = router;
