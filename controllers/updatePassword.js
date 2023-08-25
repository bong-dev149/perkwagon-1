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

            

            //hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            //update password
            await Auth.update({ password: hashedPassword }, {
                where: {
                    auth_id: user.auth_id
                }
            });


            // add token to blocked token table
            await BlockedToken.create({ token: resetToken , tokenExpiry: Date.now()});

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