const Auth = require('../models/Auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv/config');

const jwtSecret = process.env.JWT_SECRET || 'my_secret_key';
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';

const authController = {
    async registerUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await Auth.findOne({ where: { email } });
            
            if (user) {
                return res.status(400).json({ error: 'Email already exist' });
            }
            
             
            const hashedPassword= await bcrypt.hash(password, 10);
            let newUser = await Auth.create({ email, password: hashedPassword });

            const token = jwt.sign({ id: newUser.id, email: newUser.email }, jwtSecret, { expiresIn: jwtExpiresIn });
            res.status(201).json({ message: 'User registered successfully', token });

        } catch (err) {
            res.status(500).json({ error: 'Error registering new user' });
        }
    },

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await Auth.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: jwtExpiresIn });
            res.json({ message: 'Login successful', token });
            
        } catch (err) {
            res.status(500).json({ error: 'Error logging in' });
        }
    },
};

module.exports = authController;
