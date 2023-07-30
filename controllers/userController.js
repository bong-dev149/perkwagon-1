const User = require('../models/User');

const userController = {
    async createUser(req, res) {
        try {

            const { name, email, phoneNumber } = req.body;
            let user = await User.create({ name, email, phoneNumber });

            res.status(201).json({ message: 'User created successfully', user });
        } catch (err) {
            res.status(500).json({ error: 'Error creating user' });
        }
    },

    /*async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);

        } catch (err) {
            res.status(500).json({ error: 'Error retrieving users' });
        }
    },

    async getUserById(req, res) {
        try {
            const { userId } = req.params;
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: 'Error retrieving user' });
        }
    },

    async updateUserById(req, res) {
        try {
            const { userId } = req.params;
            const { username, email, password, phoneNumber } = req.body;
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            user.username = username;
            user.email = email;
            user.password = password;
            user.phoneNumber = phoneNumber;
            await user.save();
            res.json({ message: 'User updated successfully', user });
        } catch (err) {
            res.status(500).json({ error: 'Error updating user' });
        }
    },

    async deleteUserById(req, res) {
        try {
            const { userId } = req.params;
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            await user.destroy();
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Error deleting user' });
        }
    },*/
};

module.exports = userController;
