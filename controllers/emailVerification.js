
const BlockedToken = require('../models/BlockedToken');
const Auth = require('../models/Auth');
require('dotenv/config');

const verify = async (req, res) => {
    try {
        if (!req.error) {
            //get data
            const user = req.user;
            const token = req.query.token;

            //update the verify status in database
            await Auth.update({ verified: true }, {
                where: {
                    auth_id: user.auth_id
                }
            });

            // put the token into blocked token table
            await BlockedToken.create({ token: token, tokenExpiry: Date.now() });

            //send response
            res.status(200).json({ msg: 'Successfully verified' });

        } else {
            res.status(400).json(req.error);
        }
    } catch (err) {
        res.status(400).json({ msg: 'Verification Failed' });
    }

}

module.exports = verify;