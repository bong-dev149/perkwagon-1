const Auth = require('../models/Auth');
const tokenController = require('../Reusable module/tokenController');
const bcrypt = require('bcryptjs');
const cnfEmail = require('../emailService/confirmEmailResolver');
require('dotenv/config');
const { validationResult } = require('express-validator');
const loginUser= async (req, res)=>{
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

        const token = await tokenController.genToken(
            { userId: user.id, email: user.email },
            "30m",
            process.env.JWT_SECRET
        );
        res.json({ message: 'Login successful', token });

    } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
    }
}
module.exports = loginUser;