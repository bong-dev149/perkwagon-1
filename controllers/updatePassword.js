const Auth = require('../models/Auth');
const bcrypt = require('bcryptjs');
const { verifyToken } = require('../Reusable module/tokenController');
const updatePassword = async (req, res) => {
    try {
        const token = req.headers['auth-token'];
        console.log(token);
        const { id } = await verifyToken(token, process.env.PASS_RESET_SECRET);
        const { password } = req.body;

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //update password
        await Auth.update({ password: hashedPassword }, {
            where: {
                id: id
            }
        });
        //respond
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = updatePassword;