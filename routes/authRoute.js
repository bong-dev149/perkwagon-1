const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
// Define routes
router.put('/', authController.registerUser, userController.createUser);
router.post('/', authController.loginUser);
module.exports = router;
