const Auth = require('../models/Auth');
const bcrypt = require('bcryptjs');
const cnfEmail = require('../emailService/confirmEmailResolver');
require('dotenv/config');
const { validationResult } = require('express-validator');
const registerUser=async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        let user = await Auth.findOne({ where: { email } });

        if (user) {
            return res.status(400).json({ error: 'Email already exist' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        user = await Auth.create({ email: email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });

        await cnfEmail(user);



    } catch (err) {
        res.status(500).json(err.message);
    }
};
module.exports = registerUser;