const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');

const registerValidationRules = [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const loginValidationRules = [
    check('email').isEmail().withMessage('Invalid email address'),
];
// Define routes
router.put('/', registerValidationRules, authController.registerUser);
router.post('/', loginValidationRules, authController.loginUser);

module.exports = router;
