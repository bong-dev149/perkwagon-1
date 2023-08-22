
const BlockedToken = require('../models/BlockedToken');
const Auth = require('../models/Auth');
require('dotenv/config');

const verify = async (req, res) => {
    try {
        if (!req.error) {
            console.log('Hello');
            //get data
            const user = req.user;
            const token = req.query.token;

            //update the verify status in database
            await Auth.update({ verified: true }, {
                where: {
                    auth_id: user.auth_id
                }
            });

            //set tokenExpiry field for Block the token
            
            const tokenExpiry = Date.now();
            await BlockedToken.update({ tokenExpiry: tokenExpiry }, {
                where: {
                    token: token
                }
            });

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