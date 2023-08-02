const Auth = require('../models/Auth');
const bcrypt = require('bcryptjs');
const cnfEmail = require('../emailService/confirmEmailResolver');
require('dotenv/config');
const { validationResult } = require('express-validator');

const registerUser=async (req, res)=>{
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Get data from request body
        const { email, password } = req.body;

        // Check if user exists
        let user = await Auth.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ error: 'Email already exist' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        user = await Auth.create({ email: email, password: hashedPassword });

        //send response
        res.status(201).json({ message: 'User registered successfully' });

        //send confirmation email
        const msg=await cnfEmail(user);
        console.log(msg);

    } catch (err) {
        res.status(500).json({ error: 'Error registering user' });
        
    }
};
module.exports = registerUser;