const Auth = require('../models/Auth');
const tokenController = require('../Reusable module/tokenController');
const {expiresInToMilliseconds} = require('../Reusable module/utils');
const bcrypt = require('bcryptjs');
require('dotenv/config');
const { validationResult } = require('express-validator');

const loginUser= async (req, res)=>{

    const expiresIn=process.env.EXPIRES_IN;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const user = await Auth.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.verified === false) {
            return res.status(401).json({ error: 'Email not verified' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        //Get Access Token
        const acccessToken = await tokenController.genToken(
            { id: user.id, email: user.email },
            expiresIn,
            process.env.JWT_SECRET
        );

        // Get the timestamp of the token expiration
        const tokenExpiration = new Date(Date.now() + expiresInToMilliseconds(expiresIn)).toISOString();
        
        //Get Refresh Token
        const refreshToken = await tokenController.genToken(
            { id: user.id, email: user.email },
            "28d",
            process.env.JWT_REFRESH_SECRET
        );
        res.json({ message: 'Login successful', acccessToken,tokenExpiration, refreshToken });

    } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
    }
}
module.exports = loginUser;