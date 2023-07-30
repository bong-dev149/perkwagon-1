const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define routes
router.put('/', authController.registerUser);
router.post('/', authController.loginUser);

module.exports = router;
