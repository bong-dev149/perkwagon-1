
const tokenController = require('../Reusable module/tokenController')
const Auth = require('../models/Auth');
require('dotenv/config');

const verify = async (req, res) => {
    // get the token from the url
    const token = req.query.token;
    // verify the token
    // if verification succeeded, redirect to success page
    try {

        const user = await tokenController.verifyToken(token, process.env.JWT_SECRET);
       
        await Auth.update({ verified: true }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({ message: 'Successfully verified' });

    } catch (err) {
        res.status(400).json({ error: 'Verification Failed' });

    }

}

module.exports = verify;