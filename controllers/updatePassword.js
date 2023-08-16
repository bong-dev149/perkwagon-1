const Auth = require('../models/Auth');
const BlockedToken = require('../models/BlockedToken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');


const updatePassword = async (req, res) => {
    // Validate the request password validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        if (!req.error) {
            //get data from request
            const resetToken = req.query.token;
            const user = req.user;
            const { password } = req.body;

            //set tokenExpiry field for Block the token
          
            const resetTokenExpiry = Date.now();
            await BlockedToken.update({ tokenExpiry: resetTokenExpiry }, {
                where: {
                    token: resetToken
                }
            });

            //hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            //update password
            await Auth.update({ password: hashedPassword }, {
                where: {
                    id: user.id
                }
            });

            //send response
            res.status(200).json({ msg: 'Password updated successfully' });
        } else {
            //send response
            res.status(400).json(req.error);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = updatePassword;