const Auth = require('../models/Auth');
const tokenController = require('../reusable_module/tokenController');
const { expiresInToMilliseconds } = require('../reusable_module/utils');
const bcrypt = require('bcryptjs');
require('dotenv/config');
const { validationResult } = require('express-validator');

const loginUser = async (req, res) => {

    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ type: 'validationError', msg: { errors: errors.array() } });
    }

    try {
        // Get data from request body
        const { email, password } = req.body;
        // Check if user exists
        const user = await Auth.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ type: 'userError', msg: 'User not found' });
        }

        // Check if user is verified
        if (user.verified === false) {
            return res.status(401).json({ type: 'emailError', msg: 'Email not verified' });
        }

        // Check if password is correct
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        //Get Access Token
        const acccessToken = await tokenController.genToken(
            { id: user.id, email: user.email },
            process.env.JWT_ACCESS_EXPIRES_IN,
            process.env.JWT_ACCESS_SECRET
        );

        // Get the timestamp of the token expiration
        const tokenExpiration = new Date(Date.now() + expiresInToMilliseconds(process.env.JWT_ACCESS_EXPIRES_IN)).toISOString();

        //Get Refresh Token
        const refreshToken = await tokenController.genToken(
            { id: user.id, email: user.email },
            process.env.JWT_REFRESH_EXPIRES_IN,
            process.env.JWT_REFRESH_SECRET
        );

        //send response
        res.json({ msg: 'Login successful', typeofuser: user.typeofuser, acccessToken, tokenExpiration, refreshToken });

    } catch (err) {

        res.status(500).json({ error: 'Error logging in' });
    }
}

module.exports = loginUser;